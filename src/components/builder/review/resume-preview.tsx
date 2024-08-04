"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import EditIcon from "@mui/icons-material/Edit";
import Typography from "@mui/material/Typography";
import CachedIcon from "@mui/icons-material/Cached";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import DraggableList from "react-draggable-list";
import type { Resume } from "../../../lib/client";

interface PlanetListItem {
  id: string;
  bullet: string;
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
  resumeDetails: Resume | undefined;
  matchedSkills: string;
  bulletEditStatus: { state: string; bullet: string; id: string };
  handleClickCancel(action: string): any;
  handleEditAction(action: string, index: string, data?: any): any;
  setIsPending(action: boolean): any;
}

interface bulletList {
  experience: Array<Array<{ id: string; bullet: string }>>;
  projects: Array<Array<{ id: string; bullet: string }>>;
}

const styles = {
  skillHighlight: {
    backgroundColor: "#d7ffdf",
  },
};

class PlanetItem extends React.Component<PlanetProps, PlanetState> {
  // getDragHeight() {
  //   return this.props.item.subtitle ? 47 : 28;
  // }

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
        <div>{item.bullet}</div>
      </div>
    );
  }
}

export function ResumePreview({ resumeDetails, matchedSkills, bulletEditStatus, handleClickCancel, handleEditAction, setIsPending }: ResumePreviewProps): React.JSX.Element {
  const router = useRouter();
  const _container = React.createRef<HTMLDivElement>();
  const [updateLog, setUpdateLog] = React.useState<any>({});
  const [resume, setResume] = React.useState<Resume | undefined>(undefined);
  const [userAction, SetUserAction] = React.useState<{ state: string; bullet: string; id: string }>({ state: "", bullet: "", id: "" });

  let tempBulletPointsList: bulletList = { experience: [], projects: [] };
  if (resumeDetails) {
    resumeDetails.experience.forEach((experience, index) => {
      tempBulletPointsList["experience"][index] = [];

      for (let i = 0; i < experience.bullets.length; i++) {
        tempBulletPointsList["experience"][index][i] = {
          id: i.toString(),
          bullet: experience.bullets[i],
        };
      }
    });

    resumeDetails.projects.forEach((project, index) => {
      tempBulletPointsList["projects"][index] = [];

      for (let i = 0; i < project.bullets.length; i++) {
        tempBulletPointsList["projects"][index][i] = {
          id: i.toString(),
          bullet: project.bullets[i],
        };
      }
    });
  }
  const [bulletPointsList, setBulletPointsList] = React.useState<bulletList>(tempBulletPointsList);

  React.useEffect(() => {
    setResume(resumeDetails);
    SetUserAction(bulletEditStatus);
  }, [resumeDetails, bulletEditStatus]);

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

  function _onListChange(newList: ReadonlyArray<PlanetListItem>, exp_index: number) {
    const updatedList = [...newList];
    const newBulletPointsList = structuredClone(bulletPointsList);

    newBulletPointsList["experience"][exp_index] = updatedList;
    setBulletPointsList(newBulletPointsList);
    console.log(newList);
    console.log(newBulletPointsList);
  }

  function handleClickAction(action: string) {
    SetUserAction({ state: action, bullet: "", id: "" });
  }

  function handleAddBullet(e: React.MouseEvent<HTMLDivElement>, index: string) {
    handleEditAction("add", index);
  }

  function handleReplaceBullet(e: React.MouseEvent<HTMLDivElement>, index: string) {
    handleEditAction("replace", index);
  }

  function handleDeleteBullet(e: React.MouseEvent<SVGSVGElement>, category: string, category_id: number, bullet_id: number) {
    if (category === "exp") {
      let updatedList = resume?.experience[category_id]["bullets"];
      updatedList?.splice(bullet_id, 1);

      let updatedResume = structuredClone(resume);
      if (updatedList && updatedResume) {
        updatedResume.experience[category_id]["bullets"] = updatedList;

        setResume(updatedResume);
      }
    }
    handleEditAction("delete", category + "_" + category_id + "_" + bullet_id);
  }

  function handleClickSave() {
    setUpdateLog(updateLog);
    handleEditAction("edit", "", updateLog);
  }

  const handleEditInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: string) => {
    updateLog[index] = event.target.value;
  };

  return resume ? (
    <Box sx={{ color: "#000", fontSize: "12px", height: "100%", width: "100%" }}>
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
              {resume.experience.map((experience, exp_index) => (
                <Box key={"exp_bullets" + exp_index}>
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
                    {userAction.state === "replace" && (
                      <>
                        {experience.bullets.map((bullet, index) => (
                          <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1, cursor: "pointer" }} onClick={(e) => handleReplaceBullet(e, "exp_" + exp_index + "_" + index)}>
                            <Box component="img" alt="Widgets" src="/assets/replace.png" sx={{ height: "100%", width: "100%", maxWidth: "20px", cursor: "pointer", marginRight: 2 }} />
                            <span dangerouslySetInnerHTML={{ __html: highlight_text(bullet) }} key={index}></span>
                          </Box>
                        ))}
                      </>
                    )}

                    {userAction.state === "delete" && (
                      <>
                        {experience.bullets.map((bullet, index) => (
                          <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <DeleteOutlineIcon
                              color="error"
                              onClick={(e) => handleDeleteBullet(e, "exp", exp_index, index)}
                              sx={{ height: "100%", width: "100%", maxWidth: "20px", cursor: "pointer", marginRight: "10px" }}
                            />
                            <span dangerouslySetInnerHTML={{ __html: highlight_text(bullet) }} key={index}></span>
                          </Box>
                        ))}
                      </>
                    )}

                    {userAction.state === "edit" && (
                      <Box component="form" noValidate autoComplete="off">
                        {experience.bullets.map((bullet, index) => (
                          <TextField
                            hiddenLabel
                            fullWidth
                            size="small"
                            margin="dense"
                            variant="outlined"
                            key={index}
                            placeholder="Please enter a bullet point"
                            InputLabelProps={{ shrink: false }}
                            defaultValue={bullet}
                            onChange={(e) => handleEditInput(e, "exp_" + exp_index + "_" + index)}
                            inputProps={{ style: { fontSize: "13px" } }}
                          />
                        ))}
                      </Box>
                    )}

                    {userAction.state === "reorder" && (
                      <Box component="div" ref={_container} sx={{ mt: 1 }}>
                        <DraggableList<PlanetListItem, void, PlanetItem>
                          itemKey="id"
                          template={PlanetItem}
                          list={bulletPointsList["experience"][exp_index]}
                          onMoveEnd={(newList) => _onListChange(newList, exp_index)}
                          container={() => document.body}
                        />
                      </Box>
                    )}

                    {(userAction.state === "add" || userAction.state === "") && (
                      <>
                        {experience.bullets.map((bullet, index) => (
                          <p dangerouslySetInnerHTML={{ __html: highlight_text(bullet) }} key={index}></p>
                        ))}
                      </>
                    )}

                    {userAction.state === "add" && (
                      <Box sx={{ textAlign: "center", cursor: "pointer" }} onClick={(e) => handleAddBullet(e, "exp_" + exp_index)}>
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
              {resume.projects.map((project, proj_index) => (
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
                    {(userAction.state === "add" || userAction.state === "") && (
                      <>
                        {project.bullets.map((bullet) => (
                          <p dangerouslySetInnerHTML={{ __html: highlight_text(bullet) }} key={bullet}></p>
                        ))}
                      </>
                    )}

                    {userAction.state === "add" && (
                      <Box sx={{ textAlign: "center", cursor: "pointer" }} onClick={(e) => handleAddBullet(e, "proj_" + proj_index)}>
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
          {(userAction.state === "add" || userAction.state === "replace") && (
            <Button variant="contained" onClick={() => handleClickCancel("")} startIcon={<HighlightOffIcon />}>
              Cancel
            </Button>
          )}
          {userAction.state === "delete" && (
            <Button variant="contained" onClick={() => handleClickCancel("delete")} startIcon={<CheckCircleOutlineIcon />}>
              Save
            </Button>
          )}
          {userAction.state === "reorder" && (
            <Button variant="contained" onClick={() => handleClickCancel("reorder")} startIcon={<CheckCircleOutlineIcon />}>
              Save
            </Button>
          )}
          {userAction.state === "edit" && (
            <Button variant="contained" onClick={handleClickSave} startIcon={<SaveIcon />}>
              Save
            </Button>
          )}
          {userAction.state === "" && (
            <>
              <Button variant="contained" onClick={() => handleClickAction("edit")} startIcon={<EditIcon />}>
                Edit
              </Button>
              <Button variant="contained" onClick={() => handleClickAction("reorder")} startIcon={<CachedIcon />}>
                Re-Order
              </Button>
              <Button variant="contained" onClick={() => handleClickAction("delete")} startIcon={<DeleteOutlineIcon />}>
                Delete
              </Button>
            </>
          )}
        </Stack>
      </Box>
    </Box>
  ) : (
    <>Loading Resume....</>
  );
}
