import { Pagination, Stack } from "@mui/material";
import React from "react";

export default function PaginationBar() {
  return (
    <Stack>
      <Pagination color="primary" size="large" count={1} />
    </Stack>
  );
}
