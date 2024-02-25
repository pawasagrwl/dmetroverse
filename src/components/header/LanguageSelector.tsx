import React from 'react';
import { MenuItem, Select } from '@mui/material';

interface LanguageSelectorProps {
  language: string;
  setLanguage: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, setLanguage }) => (
  <Select
    value={language}
    onChange={(e) => setLanguage(e.target.value as string)}
    sx={{ mr: 2, minWidth: 120 }}
    size="small"
  >
    <MenuItem value="en">English</MenuItem>
    <MenuItem value="hi">Hindi</MenuItem>
    <MenuItem value="fr">French</MenuItem>
  </Select>
);

export default LanguageSelector;
