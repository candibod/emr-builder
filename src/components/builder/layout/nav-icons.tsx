import DescriptionIcon from "@mui/icons-material/Description";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import CopyAllOutlinedIcon from "@mui/icons-material/CopyAllOutlined";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import WebIcon from "@mui/icons-material/Web";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { SvgIconComponent } from "@mui/icons-material";

export const navIcons = {
  "new-note": NoteAddOutlinedIcon,
  "upload-file": UploadFileOutlinedIcon,
  "copy-all": CopyAllOutlinedIcon,
  "quick-tools": BuildCircleIcon,
  "get-keywords": ManageSearchIcon,
  "match-score": AssessmentIcon,
  description: DescriptionIcon,
  reviews: FileCopyOutlinedIcon,
  scraper: WebIcon,
  logs: AllInboxIcon,
  jobs: WorkOutlineIcon,
  user: PersonOutlineIcon,
} as Record<string, SvgIconComponent>;
