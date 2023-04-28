import React from 'react'
import { Card, CardContent, Typography } from '@mui/material';

interface ICardBaseProps {
  title: string
  content: string
}

const CardBase: React.FC<ICardBaseProps> = ({ title, content }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {content}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardBase;
