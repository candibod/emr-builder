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
import FindInPageIcon from "@mui/icons-material/FindInPage";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import PollIcon from "@mui/icons-material/Poll";
import { SvgIconComponent } from "@mui/icons-material";

export const navIcons = {
  "new-note": NoteAddOutlinedIcon,
  "upload-file": UploadFileOutlinedIcon,
  "copy-all": CopyAllOutlinedIcon,
  "quick-tools": BuildCircleIcon,
  "get-keywords": FindInPageIcon,
  "match-score": CompareArrowsIcon,
  "job-tracker": PollIcon,
  description: DescriptionIcon,
  reviews: FileCopyOutlinedIcon,
  scraper: WebIcon,
  logs: AllInboxIcon,
  jobs: WorkOutlineIcon,
  user: PersonOutlineIcon,
} as Record<string, SvgIconComponent>;
