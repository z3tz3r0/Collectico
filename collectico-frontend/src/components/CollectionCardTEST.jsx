import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function CollectionCard({    widthPerCent="555%",
                                            maxWidth=345,
                                            height="100%",
                                            image1="https://i.pinimg.com/736x/4f/b8/95/4fb8951ee4abaaf4f159d9db98718bfa.jpg",
                                            name="Portrait Painting",
                                            detail="Explore stunning portrait collections.",
                                            linkURL="https://www.google.com/",
                                            altDetail ="Alt detail",
                                            prices = false,
                                            minHeightImage = "330px",
                                            ...prop
  }) {
  return (
    <Card sx={{ maxWidth: maxWidth,
                minWidth: 120,
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                width: widthPerCent,
                height: height,
                '&:hover .cardImage': {transform: 'scale(1.1)', transition: 'transform 0.7s', objectFit: 'cover',},
                '&:hover .cardDetail': {opacity: 1},
                ...prop,
     }}>
    <a href= {linkURL}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={image1}
          alt={altDetail}
          className='cardImage'
          sx = {{ minHeight:minHeightImage}}
        />

        <CardContent
        className='cardDetail'
        sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, #62483ac4, transparent)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            opacity: 0,
            transition: 'opacity 0.3s',
          }}>

          <Typography gutterBottom variant="h5" component="div" sx={{color: '#ffffff', fontWeight: 'bold', mb:'16px'}}>
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: '#ffffff', mb:'16px'}}>
            {detail}
          </Typography>
          {prices && (
              <Typography variant="body2" sx={{ color: "#ffffff", mb: "16px" }}>
               {prices}
              </Typography>
            )}
        </CardContent>
      </CardActionArea>
      </a>
    </Card>
  );
}
