"use client";

import * as React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Chip, { ChipProps } from "@mui/material/Chip";
import ButtonGroup from "@mui/material/ButtonGroup";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import Divider from "@mui/material/Divider";
import { useParams } from "next/navigation";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Unstable_Grid2";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { resumeClient } from "../../../lib/client";
import CustomTextArea from "../../../lib/textarea";
import { ResumePreview } from "../review/resume-preview";
import AdjustIcon from "@mui/icons-material/Adjust";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const schema = zod.object({
  job_description: zod.string().min(1, { message: "Job Description is required" }),
  job_role: zod.string().min(1, { message: "Job Description is required" }),
  job_url: zod.string(),
  company_name: zod.string(),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { job_description: "", job_role: "", job_url: "", company_name: "" } satisfies Values;

export function ResumeReview(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(true);
  const [jobStatsData, setJobStatsData] = React.useState({});
  const [resume, setResume] = React.useState();
  const [selectedSkills, setSelectedSkills] = React.useState<Array<string>>([]);
  const [relevantBullets, setRelevantBullets] = React.useState<Array<string>>([]);
  const params = useParams();

  React.useEffect(() => {
    async function fetchMyAPI() {
      setIsPending(true);
      const { slug } = params;
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

      const { data, error } = await resumeClient.getMatchStats(values);

      if (error) {
        setError("root", { type: "server", message: error });
        // setIsPending(false);
        return;
      }

      if (data) setJobStatsData(data);
    },
    [setError]
  );

  function handleDelete() {}

  function checkSkillSelection() {
    return true;
  }

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

    getRelevantBullets(selectedSkills);
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
      {Object.keys(jobStatsData).length > 0 ? (
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
                      Live From Space
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                      Mac Miller
                    </Typography>
                  </Box>
                  <Box>
                    <Box sx={{ position: "relative", display: "inline-flex" }}>
                      <CircularProgress variant="determinate" value={50} />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: "absolute",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="caption" component="div" color="text.secondary">{`${Math.round(50)}%`}</Typography>
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
            <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
              Technical
            </Typography>
            <Stack direction="row" useFlexGap flexWrap="wrap" spacing={1} sx={{ mb: 2 }}>
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
            <Typography variant="h6" sx={{ mt: 1 }} gutterBottom>
              Non Technical
            </Typography>
            <Alert severity="info" color="info" sx={{ mb: 3 }}>
              No Matching Records.
            </Alert>
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
                <Box sx={{ width: "100%", textAlign: "center", mt: 1, mb: 2 }}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                                  <ButtonGroup size="small" aria-label="Small button group">
                                    <Button>Add</Button>
                                    <Button>Replace</Button>
                                  </ButtonGroup>
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
                    "& > :not(style)": { m: 1, width: "25ch" },
                    marginTop: "8px",
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <FormControl error={Boolean(errors.job_url)}>
                    <TextField label="Experience" variant="outlined" />
                    <FormHelperText>Ex: Collaborated with CRM Team</FormHelperText>
                    {errors.job_url ? <FormHelperText>{errors.job_url.message}</FormHelperText> : null}
                  </FormControl>
                  <FormControl error={Boolean(errors.job_url)}>
                    <TextField label="Activity" variant="outlined" />
                    <FormHelperText>Ex: Develop and enhance the UX</FormHelperText>
                    {errors.job_url ? <FormHelperText>{errors.job_url.message}</FormHelperText> : null}
                  </FormControl>
                  <FormControl error={Boolean(errors.job_url)}>
                    <TextField label="Result" variant="outlined" />
                    <FormHelperText>Ex: Increase conversion rate by 6%</FormHelperText>
                    {errors.job_url ? <FormHelperText>{errors.job_url.message}</FormHelperText> : null}
                  </FormControl>
                </Box>
                <Box sx={{ width: "100%", textAlign: "center" }}>
                  <Button variant="contained">AI Generate</Button>
                </Box>
              </>
            ) : (
              <Alert severity="info" color="info" sx={{ mb: 3 }}>
                Select any skills to start getting sentences.
              </Alert>
            )}
          </Box>
          <Box
            sx={{
              alignItems: "center",
              margin: "10px",
              borderRadius: "30px",
              background: "white",
              color: "var(--mui-palette-common-white)",
              display: { xs: "flex", lg: "flex" },
              flexBasis: { xs: "auto", lg: "50%" },
              justifyContent: "center",
              p: 3,
            }}
          >
            <Stack spacing={3}>
              <ResumePreview resumeDetails={resume} />
            </Stack>
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
