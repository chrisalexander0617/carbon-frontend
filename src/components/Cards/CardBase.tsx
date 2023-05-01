import React from 'react'
import * as MUI from '@mui/material';

interface ICardBaseProps {
  title: string
  content: string
}

const CardBase: React.FC<ICardBaseProps> = ({ title, content }) => {
  return (
    <MUI.Card>
      <MUI.CardContent>
        <MUI.Typography variant="h5" component="h2">
          {title}
        </MUI.Typography>
        <MUI.Typography color="textSecondary" gutterBottom>
          {content}
        </MUI.Typography>
      </MUI.CardContent>
    </MUI.Card>
  )
}

export default CardBase;
