import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import api from '../../services/api'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    flexGrow: 1
  },
  row: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

export default function InputAdornments() {
  const classes = useStyles();
  const [data, setData] = React.useState({
    name: '',
    barcode: '',
    reference: '',
    description: '',
    purchasePrice: '',
    salePrice: '',
    un: 'UN',
    weight: '',
    sell: '',
    location: '',
    category: 1,
    company: 1,

  });

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data)
    const options = {
      headers: {'Content-Type': 'application/json' }
    }
    api.post('/products', data, options).then(res => {
      console.log(res)
    })
  }

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
    console.log(data)
  };

  return (
    <form className={classes.root} onSubmit={(e) => handleSubmit(e)}>
      <div className={classes.row}>
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="barcode">Código de Barras</InputLabel>
          <OutlinedInput
            id="barcode"
            value={data.barcode}
            onChange={handleChange('barcode')}
            labelWidth={140}
          />
        </FormControl>
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="reference">Referência</InputLabel>
          <OutlinedInput
            id="reference"
            value={data.reference}
            onChange={handleChange('reference')}
            labelWidth={140}
          />
        </FormControl>
      </div>
      <div className={classes.row}>
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="name">Nome do Produto</InputLabel>
          <OutlinedInput
            id="name"
            value={data.name}
            onChange={handleChange('name')}
            labelWidth={120}
          />
        </FormControl>
      </div>
      <div className={classes.row}>
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="description">Descrição</InputLabel>
          <OutlinedInput
            id="description"
            value={data.description}
            onChange={handleChange('description')}
            labelWidth={70}
          />
        </FormControl>
      </div>
      <div className={classes.row}>
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="un">Unidade</InputLabel>
          <OutlinedInput
            id="un"
            value={data.un}
            onChange={handleChange('un')}
            labelWidth={60}
          />
        </FormControl>
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="description">R$ Compra</InputLabel>
          <OutlinedInput
            id="purchasePrice"
            value={data.purchasePrice}
            onChange={handleChange('purchasePrice')}
            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
            labelWidth={80}
          />
        </FormControl>
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="salePrice">R$ Venda</InputLabel>
          <OutlinedInput
            id="salePrice"
            value={data.salePrice}
            onChange={handleChange('salePrice')}
            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
            labelWidth={80}
          />
        </FormControl>
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="weight">Peso</InputLabel>
          <OutlinedInput
            id="weight"
            value={data.weight}
            onChange={handleChange('weight')}
            startAdornment={<InputAdornment position="start">KG</InputAdornment>}
            labelWidth={60}
          />
        </FormControl>
      </div>
      <div className={classes.row}>
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="location">Localização</InputLabel>
          <OutlinedInput
            id="location"
            value={data.location}
            onChange={handleChange('location')}
            labelWidth={90}
          />
        </FormControl>
      </div>
      <div className={classes.row}>
        <FormControl className={classes.margin}>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
          >
              Salvar
          </Button>
        </FormControl>
        <FormControl fullwidth className={classes.margin}>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            className={classes.button}
            startIcon={<DeleteIcon />}
          >
              Deletar
          </Button>
        </FormControl>
      </div>


    </form>
  );
}
