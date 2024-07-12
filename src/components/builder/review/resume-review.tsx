"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TableRow from "@mui/material/TableRow";
import Backdrop from "@mui/material/Backdrop";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import ButtonGroup from "@mui/material/ButtonGroup";
import Chip, { ChipProps } from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import TableContainer from "@mui/material/TableContainer";
import CircularProgress from "@mui/material/CircularProgress";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { useParams } from "next/navigation";
import type { Resume, JobStatsData, EditResumeParams } from "../../../lib/client";
import { resumeClient } from "../../../lib/client";
import { ResumePreview } from "../review/resume-preview";

const schema = zod.object({
  experience: zod.string().min(6, { message: "Experience is required, min length: 6" }),
  activity: zod.string().min(6, { message: "Activity is required, min length: 6" }),
  result: zod.string().min(6, { message: "Result is required, min length: 6" }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { experience: "", activity: "", result: "" } satisfies Values;

export function ResumeReview(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(true);
  const [jobStatsData, setJobStatsData] = React.useState<JobStatsData | undefined>(undefined);
  const [resume, setResume] = React.useState<Resume | undefined>();
  const [selectedSkills, setSelectedSkills] = React.useState<Array<string>>([]);
  const [relevantBullets, setRelevantBullets] = React.useState<Array<string>>([]);
  const [generatedText, setGeneratedText] = React.useState({});
  const [bulletEditStatus, setBulletEditStatus] = React.useState({ state: "", bullet: "", id: "" });
  const params = useParams();
  const { slug } = params;

  async function fetchMyAPI() {
    setIsPending(true);
    if (slug !== undefined) {
      const { data, error } = await resumeClient.getResumeReview(slug);

      if (error) {
        console.log("error", error);
        setIsPending(false);
        return;
      }

      console.log(data);
      if (data) {
        setIsPending(false);
        setJobStatsData(data);
        setResume(data.resume);
      }
    }
  }

  React.useEffect(() => {
    fetchMyAPI();
  }, []);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      let skills_concatenated = "";
      for (let i = 0; i < selectedSkills.length; i++) {
        skills_concatenated = skills_concatenated + selectedSkills[i] + ",";
      }

      let request_data: any = values;
      request_data["keywords"] = skills_concatenated;
      const { data, error } = await resumeClient.generateText(request_data);

      if (error) {
        setError("root", { type: "server", message: error });
        setIsPending(false);
        return;
      }

      if (data) setGeneratedText(data);
      setIsPending(false);
    },
    [setError, selectedSkills]
  );

  async function getRelevantBullets(skills, skill = "") {
    let skills_concatenated = "";
    for (let i = 0; i < skills.length; i++) {
      skills_concatenated = skills_concatenated + skills[i] + ",";
    }
    skills_concatenated = skills_concatenated + skill;

    const { data, error } = await resumeClient.getRelevantBullets(skills_concatenated);

    if (error) {
      console.log("error", error);
      setIsPending(false);
      return;
    }

    if (data) {
      setIsPending(false);
      setRelevantBullets(data);
    }

    setIsPending(false);
  }

  const handleSkillAdd = (skill: string) => {
    setIsPending(true);
    setSelectedSkills([...selectedSkills, skill.toLowerCase()]);

    getRelevantBullets(selectedSkills, skill);
  };

  const handleSkillDelete = (skill: string) => {
    const index = selectedSkills.indexOf(skill);
    selectedSkills.splice(index, 1);
    setSelectedSkills([...selectedSkills]);

    if (selectedSkills.length > 0) {
      getRelevantBullets(selectedSkills);
    }
  };

  const handleBulletClickAdd = (e) => {
    const id = e.currentTarget.getAttribute("data-id");
    const bullet = e.currentTarget.getAttribute("data-bullet");

    setBulletEditStatus({ state: "add", bullet: bullet, id: id });
  };

  const handleBulletClickReplace = (e) => {
    const id = e.currentTarget.getAttribute("data-id");
    const bullet = e.currentTarget.getAttribute("data-bullet");

    setBulletEditStatus({ state: "replace", bullet: bullet, id: id });
  };

  const handleBulletClickCancel = (action: string = "") => {
    setBulletEditStatus({ state: "", bullet: "", id: "" });

    if (action === "delete") {
      fetchMyAPI();
    }
  };

  async function updateResume(action: string, resume_data: any, is_resume_data_update: boolean = false) {
    setIsPending(true);
    const { data, error } = await resumeClient.updateResume(slug[0], action, resume_data);

    if (error) {
      console.log("error", error);
      setIsPending(false);
      window.alert(error);
      return;
    }

    if (data) {
      setIsPending(false);
      console.log(data);
      setBulletEditStatus({ state: "", bullet: "", id: "" });
      setJobStatsData(data);
      setResume(data.resume);
    }
  }

  const handleEditAction = (action: string, index: string, data: any = {}) => {
    console.log(action, index, bulletEditStatus);

    if (action === "add" && bulletEditStatus.state === "add") {
      updateResume("add", { index: index, bullet_id: bulletEditStatus.id });
    } else if (action === "replace") {
      updateResume("replace", { index: index, bullet_id: bulletEditStatus.id });
    } else if (action === "edit") {
      if (Object.keys(data).length > 0) {
        updateResume("edit", { data: data });
      } else {
        setBulletEditStatus({ state: "", bullet: "", id: "" });
      }
    } else if (action === "delete") {
      updateResume("delete", { index: index });
    } else {
      window.alert("Something went wrong, Please reload the page and try again");
    }
  };

  function SkillChip(props: ChipProps & { label: string }) {
    if (props.label.length > 0) {
      const is_selected = selectedSkills.includes(props.label.toLowerCase());

      if (is_selected) {
        return <Chip key={props.label} label={props.label} icon={<HighlightOffIcon />} clickable color="primary" variant="filled" onClick={() => handleSkillDelete(props.label)} />;
      } else {
        return <Chip key={props.label} label={props.label} icon={<RadioButtonUncheckedIcon />} clickable color="default" variant="outlined" onClick={() => handleSkillAdd(props.label)} />;
      }
    } else {
      return <></>;
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      {jobStatsData ? (
        <>
          <Box
            sx={{
              flexBasis: { xs: "auto", lg: "50%" },
              background: "white",
              p: 3,
              margin: "10px 10px 10px 10px",
              borderRadius: "30px",
            }}
          >
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Grid container justifyContent="space-between" direction="row">
                  <Box>
                    <Typography component="div" variant="h5">
                      {jobStatsData && jobStatsData.company_name ? jobStatsData.company_name : "Company"}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      {jobStatsData && jobStatsData.company_role}
                    </Typography>
                  </Box>
                  <Box>
                    <Box sx={{ position: "relative", display: "inline-flex" }}>
                      <CircularProgress variant="determinate" value={jobStatsData ? jobStatsData.match_percent : 0} />
                      <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: "absolute", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Typography variant="caption" component="div" color="text.secondary">
                          {jobStatsData && `${Math.round(jobStatsData.match_percent)}%`}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </CardContent>
            </Card>
            <Divider flexItem />
            <Typography variant="h5" sx={{ mt: 2 }} gutterBottom>
              Missing Skills
            </Typography>
            <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1} sx={{ mt: 1, mb: 2 }}>
              {jobStatsData.unmatched_skills.length > 0 ? (
                <>
                  {jobStatsData.unmatched_skills.split(",").map((keyword) => (
                    <SkillChip key={keyword} label={keyword} />
                  ))}
                </>
              ) : (
                <Alert severity="info" color="info" sx={{ mb: 2 }}>
                  No Matching Records.
                </Alert>
              )}
            </Stack>
            <Divider flexItem />
            <Typography variant="h5" sx={{ mt: 2 }} gutterBottom>
              Matched Skills
            </Typography>
            <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1} sx={{ mb: 3 }}>
              {jobStatsData.matched_skills.length > 0 ? (
                <>
                  {jobStatsData.matched_skills.split(",").map((keyword, key: number) => (
                    <Chip key={key} label={keyword} />
                  ))}
                </>
              ) : (
                <Alert severity="info" color="info" sx={{ mb: 3 }}>
                  No Matching Records.
                </Alert>
              )}
            </Stack>
            <Divider flexItem />
            <Typography variant="h5" sx={{ mt: 2 }} gutterBottom>
              Generate Sentence(s)
            </Typography>
            {selectedSkills.length > 0 ? (
              <>
                <Stack direction="row" spacing={1}>
                  <Typography variant="h6" sx={{ mt: 1 }} gutterBottom>
                    Words Selected:
                  </Typography>
                  {selectedSkills.map((keyword, key: number) => (
                    <Chip key={key} label={keyword} color="primary" variant="outlined" />
                  ))}
                </Stack>
                <Box sx={{ textAlign: "center", mt: 1, mb: 2 }}>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Sample Bullet(s)</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {relevantBullets.length > 0 ? (
                          <>
                            {relevantBullets.map((bullet, key: number) => (
                              <TableRow key={key} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                  {bullet.bullet}
                                </TableCell>
                                <TableCell align="right">
                                  {String(bulletEditStatus.id) === String(bullet.id) ? (
                                    <>
                                      <Button size="small" variant="outlined" onClick={handleBulletClickCancel}>
                                        Cancel
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      <ButtonGroup size="small" aria-label="Small button group">
                                        <Button data-id={bullet.id} data-value={bullet.bullet} onClick={handleBulletClickAdd}>
                                          Add
                                        </Button>
                                        <Button data-id={bullet.id} data-value={bullet.bullet} onClick={handleBulletClickReplace}>
                                          Replace
                                        </Button>
                                      </ButtonGroup>
                                    </>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </>
                        ) : (
                          <TableRow key="gg" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell component="td" scope="row" colSpan={2}>
                              No Relevant Bullets found, Try generating with AI based on your experience below
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Divider variant="middle" flexItem />
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1 },
                    marginTop: "8px",
                    textAlign: "center",
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Controller
                    control={control}
                    name="experience"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.experience)}>
                        <InputLabel>Experience</InputLabel>
                        <OutlinedInput {...field} label="Experience" type="text" />
                        <FormHelperText>Ex: Collaborated with CRM Team</FormHelperText>
                        {errors.experience ? <FormHelperText>{errors.experience.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                  <Controller
                    control={control}
                    name="activity"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.activity)}>
                        <InputLabel>Activity</InputLabel>
                        <OutlinedInput {...field} label="Activity" type="text" />
                        <FormHelperText>Ex: Develop and enhance the UX</FormHelperText>
                        {errors.activity ? <FormHelperText>{errors.activity.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                  <Controller
                    control={control}
                    name="result"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.result)}>
                        <InputLabel>Result</InputLabel>
                        <OutlinedInput {...field} label="Result" type="text" />
                        <FormHelperText>Ex: Increase conversion rate by 6%</FormHelperText>
                        {errors.result ? <FormHelperText>{errors.result.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                  {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
                  <Box sx={{ width: "100%", textAlign: "center" }}>
                    <Button disabled={isPending} type="submit" variant="contained">
                      AI Generate
                    </Button>
                  </Box>
                </Box>
                {Object.keys(generatedText).length > 0 ? (
                  <Box sx={{ textAlign: "center", mt: 3, mb: 3, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    <Alert icon={false} severity="info">
                      {generatedText.bullet}
                      <Stack spacing={2} direction="row" sx={{ mt: 2, justifyContent: "center" }}>
                        <Button variant="outlined">Add</Button>
                        <Button variant="outlined">Replace</Button>
                      </Stack>
                    </Alert>
                  </Box>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <Alert severity="info" color="info" sx={{ mb: 3 }}>
                Select any skills to start getting sentences.
              </Alert>
            )}
          </Box>
          <Box
            sx={{
              margin: "10px",
              borderRadius: "30px",
              background: "white",
              color: "var(--mui-palette-common-white)",
              display: { xs: "flex", lg: "flex" },
              flexBasis: { xs: "auto", lg: "50%" },
              justifyContent: "center",
              p: 1,
              height: "calc(100vh - 85px)",
              alignItems: "flex-start",
            }}
          >
            <ResumePreview
              resumeDetails={resume}
              bulletEditStatus={bulletEditStatus}
              matchedSkills={jobStatsData ? jobStatsData.matched_skills : ""}
              handleEditAction={(action, index, any) => handleEditAction(action, index, any)}
              handleClickCancel={handleBulletClickCancel}
              setIsPending={setIsPending}
            />
          </Box>
        </>
      ) : (
        <></>
      )}
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isPending}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
