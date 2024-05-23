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
import Chip from "@mui/material/Chip";
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

import { z as zod } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";

import { resumeClient } from "../../../lib/client";
import CustomTextArea from "../../../lib/textarea";
import { ResumePreview } from "../review/resume-preview";

const schema = zod.object({
  job_description: zod.string().min(1, { message: "Job Description is required" }),
  job_role: zod.string().min(1, { message: "Job Description is required" }),
  job_url: zod.string(),
  company_name: zod.string(),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { job_description: "", job_role: "", job_url: "", company_name: "" } satisfies Values;

export function ResumeReview(): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [jobStatsData, setJobStatsData] = React.useState({});
  const [resume, setResume] = React.useState();
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
        setIsPending(false);
        return;
      }

      if (data) setJobStatsData(data);
    },
    [setError]
  );

  function handleDelete() {}

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        flexGrow: 1,
        minHeight: "100%",
      }}
    >
      <Box
        sx={{
          flexBasis: { xs: "auto", lg: "50%" },
          background: "white",
          p: 3,
          margin: "10px 10px 10px 10px",
          borderRadius: "30px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Missing Skills
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }} gutterBottom>
          Technical
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
          <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
          <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
          <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
        </Stack>
        <Typography variant="h6" sx={{ mt: 1 }} gutterBottom>
          Non Technical
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="primary" color="primary" onDelete={handleDelete} />
          <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
          <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
          <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
          <Chip label="Deletable" variant="outlined" onDelete={handleDelete} />
        </Stack>
        <Typography variant="h5" sx={{ mt: 3 }} gutterBottom>
          Matched Skills
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="Chip Filled" />
          <Chip label="Chip Filled" />
        </Stack>
        <Typography variant="h5" sx={{ mt: 3 }} gutterBottom>
          Generate Sentence
        </Typography>
        <Stack direction="row" spacing={1}>
          <Typography variant="h6" sx={{ mt: 1 }} gutterBottom>
            Words Selected:
          </Typography>
          <Chip label="primary" color="primary" variant="outlined" />
          <Chip label="primary" color="primary" variant="outlined" />
        </Stack>
        <Box sx={{ width: "100%", textAlign: "center", mt: 1, mb: 2 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Bullet</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key="gg" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    o suppress this warning, you need to explicitly provide the `palette.paperChannel` as a string
                  </TableCell>
                  <TableCell align="right">
                    <ButtonGroup size="small" aria-label="Small button group">
                      <Button>Add</Button>
                      <Button>Replace</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
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
      </Box>
      <Box
        sx={{
          alignItems: "center",
          margin: "10px",
          borderRadius: "30px",
          background: "white",
          color: "var(--mui-palette-common-white)",
          display: { xs: "flex", lg: "flex" },
          flexBasis: "50%",
          justifyContent: "center",
          p: 3,
        }}
      >
        <Stack spacing={3}>
          <ResumePreview resume={resume} />
        </Stack>
      </Box>
    </Box>
  );
}
