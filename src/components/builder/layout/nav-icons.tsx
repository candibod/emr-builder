import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import CopyAllOutlinedIcon from "@mui/icons-material/CopyAllOutlined";
import { SvgIconComponent } from "@mui/icons-material";

export const navIcons = {
  "new-note": NoteAddOutlinedIcon,
  "upload-file": UploadFileOutlinedIcon,
  "copy-all": CopyAllOutlinedIcon,
  user: PersonOutlineIcon,
} as Record<string, SvgIconComponent>;
