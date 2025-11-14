import React from 'react'
import { Box, Container } from '@mui/material'

import ListMasinis from './ListMasinis'

export default function CabinRideScreen(props) {
  return (
    <Box sx={{ display: 'flex', pt: 12 }}>
      <Container
        maxWidth='xl'
        // style={{ backgroundColor: "#fff" }}
      >
        <ListMasinis />
      </Container>
    </Box>
  )
}
