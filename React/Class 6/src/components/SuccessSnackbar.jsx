import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { Fragment } from 'react';

function Snackbar() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar('This is a success message!', { variant });
  };

  return (
    <Fragment>
      <Button onClick={handleClickVariant('success')}>Show success snackbar</Button>
      <Button onClick={handleClickVariant('error')}>Show error snackbar</Button>
      <Button onClick={handleClickVariant('warning')}>Show warning snackbar</Button>
    </Fragment>
  );
}

export default function SuccessSnackbar() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Snackbar />
    </SnackbarProvider>
  );
}
