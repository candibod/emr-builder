"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import CachedIcon from "@mui/icons-material/Cached";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import DraggableList from "react-draggable-list";
import type { Resume } from "../../../lib/client";

interface PlanetListItem {
  name: string;
  subtitle?: boolean;
}

interface PlanetProps {
  item: PlanetListItem;
  itemSelected: number;
  dragHandleProps: object;
}

interface PlanetState {
  value: number;
}

interface ResumePreviewProps {
  resumeDetails: Resume;
  matchedSkills: string;
  bulletEditStatus: { state: string; bullet: string; id: string };
}

const styles = {
  skillHighlight: {
    backgroundColor: "#d7ffdf",
  },
};

class PlanetItem extends React.Component<PlanetProps, PlanetState> {
  getDragHeight() {
    return this.props.item.subtitle ? 47 : 28;
  }

  render() {
    const { item, itemSelected, dragHandleProps } = this.props;
    const scale = itemSelected * 0.05 + 1;
    const shadow = itemSelected * 15 + 1;
    const dragged = itemSelected !== 0;

    return (
      <div
        className={"item"}
        style={{
          transform: `scale(${scale})`,
          boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`,
        }}
      >
        <div className="dragHandle" {...dragHandleProps}>
          <DragIndicatorIcon />
        </div>
        <div>{item.name}</div>
      </div>
    );
  }
}

export function ResumePreview({ resumeDetails, matchedSkills, bulletEditStatus }: ResumePreviewProps): React.JSX.Element {
  const router = useRouter();
  const _container = React.createRef<HTMLDivElement>();
  const [resume, setResume] = React.useState<Resume | undefined>(undefined);
  const [list, setList] = React.useState<Array<PlanetListItem>>([
    { name: "Mercury" },
    { name: "Venus" },
    { name: "Earth", subtitle: true },
    { name: "Mars" },
    { name: "Jupiter" },
    { name: "Saturn", subtitle: true },
    { name: "Uranus", subtitle: true },
    { name: "Neptune" },
  ]);

  React.useEffect(() => {
    setResume(resumeDetails);
  }, [resumeDetails]);

  function get_split_element_in_string(element: string, index: number): string {
    return element.split(",")[index];
  }

  const matched_skills = matchedSkills.split(",");
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

  function _onListChange(newList: ReadonlyArray<PlanetListItem>) {
    const updatedList = [...newList];
    setList(updatedList);
  }

  return resume ? (
    <Box sx={{ color: "#000", fontSize: "12px", height: "100%" }}>
      <Box sx={{ height: "38px" }}>
        <Typography gutterBottom align="center" variant="h5" component="div">
          Resume Preview
        </Typography>
        <Divider />
      </Box>
      <Box sx={{ height: "calc(100% - 100px)", overflowY: "scroll", margin: "5px 0", padding: "0 8px 0 8px" }}>
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
        <hr></hr>
        <div className="list" ref={_container}>
          <DraggableList<PlanetListItem, void, PlanetItem> itemKey="name" template={PlanetItem} list={list} onMoveEnd={(newList) => _onListChange(newList)} container={() => document.body} />
        </div>
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
        <hr></hr>
        <Box>
          <Box>
            <Box sx={{ mb: 1, mt: 1 }}>
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
                  <Box className="resume-bullets" sx={{ textAlign: "justify" }}>
                    {bulletEditStatus.state === "replace" ? (
                      <>
                        {experience.bullets.map((bullet, index) => (
                          <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <Box component="img" alt="Widgets" src="/assets/replace.png" sx={{ height: "100%", width: "100%", maxWidth: "20px", cursor: "pointer", marginRight: 2 }} />
                            <span dangerouslySetInnerHTML={{ __html: highlight_text(bullet) }} key={bullet}></span>
                          </Box>
                        ))}
                      </>
                    ) : (
                      <>
                        {experience.bullets.map((bullet) => (
                          <p dangerouslySetInnerHTML={{ __html: highlight_text(bullet) }} key={bullet}></p>
                        ))}
                      </>
                    )}

                    {bulletEditStatus.state === "add" && (
                      <Box sx={{ textAlign: "center", cursor: "pointer" }}>
                        <Box component="img" alt="Widgets" src="/assets/section-add.png" sx={{ height: "auto", width: "100%", maxWidth: "40px", mb: 2 }} />
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <hr></hr>
          <Box sx={{ mb: 1 }}>
            <Box sx={{ mb: 1, mt: 1 }}>
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
                  <Box className="resume-bullets" sx={{ textAlign: "justify" }}>
                    {project.bullets.map((bullet) => (
                      <p dangerouslySetInnerHTML={{ __html: highlight_text(bullet) }} key={bullet}></p>
                    ))}
                    {(bulletEditStatus.state === "add" || bulletEditStatus.state === "replace") && (
                      <Box sx={{ textAlign: "center", cursor: "pointer" }}>
                        <Box component="img" alt="Widgets" src="/assets/section-add.png" sx={{ height: "auto", width: "100%", maxWidth: "40px", mb: 2 }} />
                      </Box>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box component="div" sx={{ backgroundColor: "white", borderRadius: "30px" }}>
        <Divider />
        <Stack spacing={2} direction="row" sx={{ p: 1 }} justifyContent="center">
          <Button variant="contained" startIcon={<EditIcon />}>
            Edit
          </Button>
          <Button variant="contained" startIcon={<CachedIcon />}>
            Re-Order
          </Button>
          <Button variant="contained" startIcon={<DeleteOutlineIcon />}>
            Delete
          </Button>
        </Stack>
      </Box>
    </Box>
  ) : (
    <>Loading Resume....</>
  );
}
