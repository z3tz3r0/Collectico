import { useState } from 'react';
import mockUpProduct from '@/data/mockUpProduct';
import { Box, Chip, Tabs, Tab } from '@mui/material';

const STATUS = [
  { label: 'All', value: 'all' },
  { label: 'Published', value: 'published' },
  { label: 'Draft', value: 'draft' },
  { label: 'Archived', value: 'archived' },
];

// Mockup status assignment for demo
const getStatus = (idx) => {
  if (idx % 4 === 0) return 'published';
  if (idx % 4 === 1) return 'draft';
  if (idx % 4 === 2) return 'archived';
  return 'published';
};

const statusColor = {
  published: '#B6EFC6',
  draft: '#FFE6A7',
  archived: '#D3D3D3',
};

const statusLabel = {
  published: 'Published',
  draft: 'Draft',
  archived: 'Archived',
};

export default function MyArtworksPage() {
  const [tab, setTab] = useState('all');
  // เพิ่ม status ให้ mockup data
  const artworks = mockUpProduct.slice(0, 7).map((item, idx) => ({ ...item, status: getStatus(idx) }));
  const filtered = tab === 'all' ? artworks : artworks.filter((a) => a.status === tab);

  return (
    <Box sx={{ bgcolor: '#f9f9f9', minHeight: '100vh', px: 4, py: 4 }}>
      {/* Header + Tabs */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ minHeight: 0 }}>
          {STATUS.map((s) => (
            <Tab
              key={s.value}
              value={s.value}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {s.label}
                  <Chip
                    label={
                      s.value === 'all'
                        ? artworks.length
                        : artworks.filter((a) => a.status === s.value).length
                    }
                    size="small"
                    sx={{ ml: 0.5, bgcolor: '#eee', fontWeight: 600 }}
                  />
                </Box>
              }
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                color: '#757575',
                '&.Mui-selected': { color: '#62483a' },
                minHeight: 0,
                minWidth: 80,
              }}
            />
          ))}
        </Tabs>
      </Box>
      {/* Artworks Grid */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr 1fr' },
        gap: 4,
        mt: 2,
      }}>
        {filtered.map((art, idx) => (
          <Box key={idx} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box
              component="img"
              src={art.image.replace('public/', '/')}
              alt={art.title}
              sx={{ width: '100%', aspectRatio: '1/1', borderRadius: 2, objectFit: 'cover', boxShadow: 1 }}
            />
            <Box sx={{ fontWeight: 500, color: '#222', fontSize: 18 }}>{art.title}</Box>
            <Box sx={{ color: '#757575', fontWeight: 400, fontSize: 16 }}>${art.price.toLocaleString()}</Box>
            <Box>
              <Chip
                label={statusLabel[art.status]}
                sx={{ bgcolor: statusColor[art.status], color: '#222', fontWeight: 500, fontSize: 14 }}
                size="small"
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
} 
