import { type FC, useState } from 'react';
import type { Contact } from '../types/contact';
import './ContactForm.scss';
import { Alert, Button, CircularProgress, Grid, Snackbar, TextField, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { cs } from 'date-fns/locale';
import { contactsApi } from '../api/contactsApi';
import { toDate } from '../helpers';
import { queryClient } from '../queryClient';
import type { SnackbarData } from '../types/snackbar';
import { contactSchema, zodBlurValidator } from '../validation/contact';

interface ContactFormProps {
  onSubmit: (contact: Omit<Contact, '_id' | 'create_date'>) => void;
  initialData: Contact;
}

const GENDER_ITEMS = [
  { label: 'Muž', value: 'on' },
  { label: 'Žena', value: 'ona' },
  { label: 'Ostatní', value: 'ono' },
];

export const ContactForm: FC<ContactFormProps> = ({ onSubmit, initialData }) => {
  const [snackbar, setSnackbar] = useState<SnackbarData | null>();

  const form = useForm({
    defaultValues: { ...initialData },
    onSubmit: ({ value }) => {
      if (value._id) {
        updateContactMutation.mutate(value);
      } else {
        createContactMutation.mutate(value);
      }
    },
    validators: {
      onSubmit: ({ value }) => {
        const result = contactSchema.safeParse(value);
        return result.success ? undefined : 'Form is invalid';
      },
    },
  });

  const createContactMutation = useMutation({
    mutationFn: (contact: Omit<Contact, '_id' | 'create_date'>) => contactsApi.createContact(contact),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      setSnackbar({ text: 'Kontakt byl vytvořen', type: 'success' });
      onSubmit(data);
    },
    onError: () => {
      setSnackbar({ text: 'Nepodařilo se vytvořit kontakt', type: 'error' });
    },
  });

  const updateContactMutation = useMutation({
    mutationFn: (contact: Contact) => {
      if (!contact._id) throw new Error('Contcat id is null');
      return contactsApi.updateContact(contact._id, contact);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      setSnackbar({ text: 'Kontakt byl upraven', type: 'success' });
      onSubmit(data);
    },
    onError: () => {
      setSnackbar({ text: 'Nepodařilo se upravit kontakt', type: 'error' });
    },
  });

  const isSubmitting = createContactMutation.isPending || updateContactMutation.isPending;

  if (!form.state.values) return <CircularProgress />;

  return (
    <div>
      <Typography variant="h2">{form.state.values._id ? 'Editovat kontakt' : 'Vytvořit nový kontakt'}</Typography>
      <hr />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="contact-form"
      >
        <Typography variant="h3">Základní údaje</Typography>

        <Grid container spacing={2}>
          <form.Field
            name="firstName"
            validators={{
              onBlur: zodBlurValidator(contactSchema.shape.firstName),
            }}
          >
            {(field) => {
              const error = field.state.meta.errors?.[0];

              return (
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Jméno"
                    variant="outlined"
                    required
                    name="firstName"
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="text-field"
                    error={!!error}
                    helperText={error ?? ' '}
                  />
                </Grid>
              );
            }}
          </form.Field>

          <form.Field
            name="lastName"
            validators={{
              onBlur: zodBlurValidator(contactSchema.shape.lastName),
            }}
          >
            {(field) => {
              const error = field.state.meta.errors?.[0];

              return (
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Příjmení"
                    variant="outlined"
                    required
                    name="lastName"
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="text-field"
                    error={!!error}
                    helperText={error ?? ' '}
                  />
                </Grid>
              );
            }}
          </form.Field>

          <form.Field name="email" validators={{ onBlur: zodBlurValidator(contactSchema.shape.email) }}>
            {(field) => {
              const error = field.state.meta.errors?.[0];

              return (
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    required
                    name="email"
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="text-field"
                    error={!!error}
                    helperText={error ?? ' '}
                  />
                </Grid>
              );
            }}
          </form.Field>

          <form.Field name="phone" validators={{ onBlur: zodBlurValidator(contactSchema.shape.phone) }}>
            {(field) => {
              const error = field.state.meta.errors?.[0];

              return (
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Telefonní číslo"
                    variant="outlined"
                    name="phone"
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="text-field"
                    error={!!error}
                    helperText={error ?? ' '}
                  />
                </Grid>
              );
            }}
          </form.Field>

          <form.Field
            name="gender"
            validators={{
              onBlur: zodBlurValidator(contactSchema.shape.gender),
            }}
          >
            {(field) => {
              const error = field.state.meta.errors?.[0];

              return (
                <Grid size={{ xs: 12 }}>
                  <FormControl error={!!error}>
                    <FormLabel id="gender">Pohlaví</FormLabel>
                    <RadioGroup
                      aria-labelledby="gender"
                      value={field.state.value}
                      name="gender"
                      onChange={(_, value: string) => field.handleChange(value)}
                    >
                      {GENDER_ITEMS.map((i) => (
                        <FormControlLabel key={i.value} value={i.value} control={<Radio />} label={i.label} />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>
              );
            }}
          </form.Field>

          <form.Field name="note" validators={{ onBlur: zodBlurValidator(contactSchema.shape.note) }}>
            {(field) => {
              const error = field.state.meta.errors?.[0];

              return (
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Poznámka"
                    variant="outlined"
                    name="note"
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="text-field"
                    error={!!error}
                    helperText={error ?? ' '}
                  />
                </Grid>
              );
            }}
          </form.Field>
        </Grid>

        <hr />
        <Typography variant="h3">Adresa</Typography>

        <Grid container spacing={2}>
          <form.Field name="city" validators={{ onBlur: zodBlurValidator(contactSchema.shape.city) }}>
            {(field) => {
              const error = field.state.meta.errors?.[0];

              return (
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Město"
                    variant="outlined"
                    name="city"
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="text-field"
                    error={!!error}
                    helperText={error ?? ' '}
                  />
                </Grid>
              );
            }}
          </form.Field>

          <form.Field
            name="street"
            validators={{
              onBlur: zodBlurValidator(contactSchema.shape.street),
            }}
          >
            {(field) => {
              const error = field.state.meta.errors?.[0];

              return (
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Ulice"
                    variant="outlined"
                    name="street"
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="text-field"
                    error={!!error}
                    helperText={error ?? ' '}
                  />
                </Grid>
              );
            }}
          </form.Field>

          <form.Field
            name="houseNumber"
            validators={{
              onBlur: zodBlurValidator(contactSchema.shape.houseNumber),
            }}
          >
            {(field) => {
              const error = field.state.meta.errors?.[0];

              return (
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Číslo a popisné"
                    variant="outlined"
                    name="houseNumber"
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="text-field"
                    error={!!error}
                    helperText={error ?? ' '}
                  />
                </Grid>
              );
            }}
          </form.Field>

          <form.Field
            name="zipCode"
            validators={{
              onBlur: zodBlurValidator(contactSchema.shape.zipCode),
            }}
          >
            {(field) => {
              const error = field.state.meta.errors?.[0];

              return (
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="ZIP"
                    variant="outlined"
                    type="number"
                    name="zipCode"
                    value={field.state.value ?? 0}
                    onChange={(e) => field.handleChange(Number.parseInt(e.target.value, 10))}
                    onBlur={field.handleBlur}
                    className="text-field"
                    error={!!error}
                    helperText={error ?? ' '}
                  />
                </Grid>
              );
            }}
          </form.Field>
        </Grid>
        <hr />

        <Grid spacing={2} container>
          <form.Field
            name="birthDate"
            validators={{
              onBlur: zodBlurValidator(contactSchema.shape.birthDate),
            }}
          >
            {(field) => {
              const error = field.state.meta.errors?.[0];

              return (
                <Grid size={{ xs: 12, md: 6 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={cs}>
                    <DatePicker
                      label="Datum narození"
                      value={toDate(field.state.value)}
                      onChange={(date) => {
                        field.handleChange(date ? date.toISOString().slice(0, 10) : undefined);
                      }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          name: 'birthDate',
                          error: !!error,
                          helperText: error,
                          className: 'text-field',
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              );
            }}
          </form.Field>
        </Grid>

        <Snackbar open={!!snackbar} autoHideDuration={6000} onClose={() => setSnackbar(null)}>
          <Alert severity={snackbar?.type ?? 'success'}>{snackbar?.text}</Alert>
        </Snackbar>

        {form.getAllErrors().form.errors?.map((error) => (
          <p key={error} className="error">
            {error}
          </p>
        ))}

        <Button type="submit" loading={isSubmitting} variant="contained">
          {form.state.values._id ? 'Upravit kontakt' : 'Vytořit kontakt'}
        </Button>
      </form>
    </div>
  );
};
