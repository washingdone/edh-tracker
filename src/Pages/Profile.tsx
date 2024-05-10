import {
  Avatar,
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { UserDecksCard, UserProfileForm } from "@/Components";
import { useUser } from "@/Context";

export const Profile = (props: { profileId: string }): JSX.Element => {
  const { profileId } = props;
  const { allUserProfiles, usersLoading, authenticatedUser } = useUser();

  const currentProfile = allUserProfiles.filter(
    (profile) => profile.id === profileId,
  )[0];
  const ownUser = profileId === authenticatedUser?.userId;

  if (!currentProfile) {
    return <Typography>User not found</Typography>;
  } else {
    return (
      <>
        {usersLoading && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <Container sx={{ p: 3 }}>
          <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
              <Card sx={{ flexGrow: 1 }}>
                <CardContent sx={{ height: "100%" }}>
                  <Stack
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: "100%" }}
                  >
                    <Avatar sx={{ height: 120, width: 120 }} />
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography>{currentProfile.displayName}</Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
              {ownUser && (
                <Card sx={{ flexGrow: 3 }}>
                  <UserProfileForm />
                </Card>
              )}
            </Stack>
            <UserDecksCard ownUser={ownUser} />
            {ownUser && (
              <Card>
                <CardHeader title="change password" />
                <Divider />
                <CardContent>
                  <Stack spacing={3}>
                    <TextField label="password" />
                    <TextField label="confirm password" />
                  </Stack>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Button variant="contained">update password</Button>
                </CardActions>
              </Card>
            )}
          </Stack>
        </Container>
      </>
    );
  }
};