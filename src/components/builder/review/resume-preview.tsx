"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

export interface LayoutProps {
  children: React.ReactNode;
}

export function ResumePreview({ resumeDetails, matchedSkills }): React.JSX.Element {
  const router = useRouter();
  const [resume, setResume] = React.useState(undefined);

  React.useEffect(() => {
    setResume(resumeDetails);
  }, [resumeDetails]);

  function get_split_element_in_string(element: string, index: number): string {
    return element.split(",")[index];
  }

  const matched_skills = matchedSkills.split(",");
  console.log(matched_skills);
  function highlight_text(point: string) {
    let updated_string = point;

    for (let i = 0; i < matched_skills.length; i++) {
      const index = updated_string.toLowerCase().indexOf(matched_skills[i].trim());
      const text = " <span class='skill-highlight'>";

      if (index !== -1) {
        const result = text.concat(updated_string.substring(index, index + matched_skills[i].trim().length), "</span>");
        updated_string = updated_string.substring(0, index) + result + updated_string.substring(index + matched_skills[i].trim().length);
      }
    }

    return updated_string;
  }

  return resume ? (
    <Box sx={{ color: "#000", fontSize: "12px" }}>
      <Typography gutterBottom align="center" variant="h5" component="div">
        Resume Preview
      </Typography>
      <Divider />
      <Box>
        <Box>
          <Typography align="center" variant="h6" component="div" sx={{ mt: 2, fontSize: "1.2rem" }}>
            <b>{resume.name}</b>
          </Typography>
          <Typography align="center" variant="body1" component="div" sx={{ fontSize: "0.8rem" }}>
            <span>Fairfax, VA | </span>
            <span>{resume.mobile_number} | </span>
            <a href="mailto:{resume.email}">{resume.email}</a>
            <span> | </span>
            <a target="_blank" href="{ resume.url }">
              {resume.url}
            </a>
          </Typography>
        </Box>
      </Box>
      <Box>
        <Box>
          <b>Education</b>
        </Box>
        {resume.education.map((education, index: number) => (
          <Box key={"education" + index}>
            <Grid container justifyContent="space-between" direction="row">
              <Box>
                <span>{get_split_element_in_string(education.name, 0)}, </span>
                <b>{get_split_element_in_string(education.name, 1)}, </b>
                <b>{get_split_element_in_string(education.name, 2)}</b>
              </Box>
              <Box>{education.timeline}</Box>
            </Grid>
          </Box>
        ))}
      </Box>
      <Box>
        <Box>
          <b>Skills</b>
        </Box>
        <ul>
          {resume.skills.map((skills, index: number) => (
            <li key={"skills" + index}>
              <b>{skills.category}</b>:&nbsp;<span dangerouslySetInnerHTML={{ __html: highlight_text(skills.skills.join(", ")) }}></span>
            </li>
          ))}
        </ul>
      </Box>
      <Box>
        <Box>
          <Box>
            <b>Experience</b>
          </Box>
          <Box>
            {resume.experience.map((experience) => (
              <Box key={experience.name}>
                <Box>
                  <Grid container justifyContent="space-between" direction="row">
                    <Box>
                      <b>{get_split_element_in_string(experience.name, 0)}, </b>
                      <b>{get_split_element_in_string(experience.name, 1)},</b>
                      <span>{get_split_element_in_string(experience.name, 2)}</span>
                    </Box>
                    <Box>{experience.timeline}</Box>
                  </Grid>
                </Box>
                <Box sx={{ textAlign: "justify" }}>
                  <ul>
                    {experience.bullets.map((bullet) => (
                      <li dangerouslySetInnerHTML={{ __html: highlight_text(bullet) }} key={bullet}></li>
                    ))}
                  </ul>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        <Box>
          <Box>
            <b>Projects</b>
          </Box>
          <Box>
            {resume.projects.map((project) => (
              <Box key={project.name}>
                <Box>
                  <Grid container justifyContent="space-between" direction="row">
                    <Box>
                      <b>{get_split_element_in_string(project.name, 0)}, </b>
                      <b>{get_split_element_in_string(project.name, 1)},</b>
                      <span>{get_split_element_in_string(project.name, 2)}</span>
                    </Box>
                  </Grid>
                </Box>
                <Box sx={{ textAlign: "justify" }}>
                  <ul>
                    {project.bullets.map((bullet) => (
                      <li dangerouslySetInnerHTML={{ __html: highlight_text(bullet) }} key={bullet}></li>
                    ))}
                  </ul>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  ) : (
    <>Loading Resume....</>
  );
}
