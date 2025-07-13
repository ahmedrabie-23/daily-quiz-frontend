import React, { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";

export default function NameForm({ setUserName, onNext }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    setUserName(name.trim());
    onNext();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5" textAlign="center">Welcome to the Daily Quiz!</Typography>
      <TextField
        label="Your Name"
        value={name}
        onChange={e => { setName(e.target.value); setError(""); }}
        required
      />
      <Button type="submit" variant="contained" color="primary">Start Quiz</Button>
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
}