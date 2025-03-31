import React from 'react';
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface UserProfileProps {
  name: string;
  relationship: string;
  email: string;
  phone: string;
  photoUrl?: string;
}

const ProfileCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: '20px auto',
  padding: theme.spacing(3),
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
}));

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  relationship,
  email,
  phone,
  photoUrl,
}) => {
  return (
    <ProfileCard>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <ProfileAvatar
            src={photoUrl}
            alt={name}
          />
          <Typography variant="h5" component="h2" gutterBottom>
            {name}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {relationship}
          </Typography>
          <Box mt={2}>
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {email}
            </Typography>
            <Typography variant="body1">
              <strong>Telefone:</strong> {phone}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </ProfileCard>
  );
};

export default UserProfile; 