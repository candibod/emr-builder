import * as React from "react";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import CardHeader from "@mui/material/CardHeader";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export interface LayoutProps {
  children: React.ReactNode;
}

export function NewJobStats(): React.JSX.Element {
  return (
    <List sx={{ width: "100%", maxHeight: "calc(100vh - 150px)", overflowX: "hidden", overflowY: "scroll", bgcolor: "background.paper" }}>
      <Paper elevation={12} sx={{ borderRadius: "20px", margin: "15px" }}>
        <Card variant="outlined">
          <CardHeader
            action={
              <Avatar sx={{ bgcolor: "#f0884d" }} aria-label="recipe">
                30%
              </Avatar>
            }
            title="Resume - sde - 4th april"
            subheader="Updated At: 4th Apr 2024, 04:34 AM"
          />
          <CardContent sx={{ padding: "0px 20px 0px 20px" }}>
            <Box sx={{ mt: "10px" }}>
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
            </Box>
            <Box sx={{ mt: "10px" }}>
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
            </Box>
          </CardContent>
          <CardActions>
            <Button sx={{ marginRight: "auto", marginLeft: "0" }} size="small">
              Download
            </Button>
            <Button sx={{ marginRight: "0", marginLeft: "auto" }} size="small">
              Edit this Resume
            </Button>
          </CardActions>
        </Card>
      </Paper>
      <Paper elevation={12} sx={{ borderRadius: "20px", margin: "15px" }}>
        <Card variant="outlined">
          <CardHeader
            action={
              <Avatar sx={{ bgcolor: "#74ce74" }} aria-label="recipe">
                30%
              </Avatar>
            }
            title="Resume - sde - 4th april"
            subheader="Updated At: 4th Apr 2024, 04:34 AM"
          />
          <CardContent sx={{ padding: "0px 20px 0px 20px" }}>
            <Box sx={{ mt: "10px" }}>
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
            </Box>
            <Box sx={{ mt: "10px" }}>
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
            </Box>
          </CardContent>
          <CardActions>
            <Button sx={{ marginRight: "0", marginLeft: "auto" }} size="small">
              Use this Resume
            </Button>
          </CardActions>
        </Card>
      </Paper>
      <Paper elevation={12} sx={{ borderRadius: "20px", margin: "15px" }}>
        <Card variant="outlined">
          <CardHeader
            action={
              <Avatar sx={{ bgcolor: "#74ce74" }} aria-label="recipe">
                30%
              </Avatar>
            }
            title="Resume - sde - 4th april"
            subheader="Updated At: 4th Apr 2024, 04:34 AM"
          />
          <CardContent sx={{ padding: "0px 20px 0px 20px" }}>
            <Box sx={{ mt: "10px" }}>
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
            </Box>
            <Box sx={{ mt: "10px" }}>
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
            </Box>
          </CardContent>
          <CardActions>
            <Button sx={{ marginRight: "0", marginLeft: "auto" }} size="small">
              Use this Resume
            </Button>
          </CardActions>
        </Card>
      </Paper>
      <Paper elevation={12} sx={{ borderRadius: "20px", margin: "15px" }}>
        <Card variant="outlined">
          <CardHeader
            action={
              <Avatar sx={{ bgcolor: "#74ce74" }} aria-label="recipe">
                30%
              </Avatar>
            }
            title="Resume - sde - 4th april"
            subheader="Updated At: 4th Apr 2024, 04:34 AM"
          />
          <CardContent sx={{ padding: "0px 20px 0px 20px" }}>
            <Box sx={{ mt: "10px" }}>
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
            </Box>
            <Box sx={{ mt: "10px" }}>
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
            </Box>
          </CardContent>
          <CardActions>
            <Button sx={{ marginRight: "0", marginLeft: "auto" }} size="small">
              Use this Resume
            </Button>
          </CardActions>
        </Card>
      </Paper>
      <Paper elevation={12} sx={{ borderRadius: "20px", margin: "15px" }}>
        <Card variant="outlined">
          <CardHeader
            action={
              <Avatar sx={{ bgcolor: "#74ce74" }} aria-label="recipe">
                30%
              </Avatar>
            }
            title="Resume - sde - 4th april"
            subheader="Updated At: 4th Apr 2024, 04:34 AM"
          />
          <CardContent sx={{ padding: "0px 20px 0px 20px" }}>
            <Box sx={{ mt: "10px" }}>
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
            </Box>
            <Box sx={{ mt: "10px" }}>
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
            </Box>
          </CardContent>
          <CardActions>
            <Button sx={{ marginRight: "0", marginLeft: "auto" }} size="small">
              Use this Resume
            </Button>
          </CardActions>
        </Card>
      </Paper>
      <Paper elevation={12} sx={{ borderRadius: "20px", margin: "15px" }}>
        <Card variant="outlined">
          <CardHeader
            action={
              <Avatar sx={{ bgcolor: "#74ce74" }} aria-label="recipe">
                30%
              </Avatar>
            }
            title="Resume - sde - 4th april"
            subheader="Updated At: 4th Apr 2024, 04:34 AM"
          />
          <CardContent sx={{ padding: "0px 20px 0px 20px" }}>
            <Box sx={{ mt: "10px" }}>
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="success" size="small" label="Small" />
            </Box>
            <Box sx={{ mt: "10px" }}>
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
              <Chip sx={{ mr: "3px" }} variant="outlined" color="warning" size="small" label="Small" />
            </Box>
          </CardContent>
          <CardActions>
            <Button size="small">Download</Button>
            <Button sx={{ marginRight: "0", marginLeft: "auto" }} size="small">
              Use this Resume
            </Button>
          </CardActions>
        </Card>
      </Paper>
    </List>
  );
}
