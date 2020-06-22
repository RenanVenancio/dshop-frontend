import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import { Redirect } from "react-router-dom";
import { useParams } from 'react-router-dom';
import api from "../../services/api";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    flexGrow: 1,
  },
  row: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

export default function ProductCreate(props) {
  const { id } = useParams()
  const classes = useStyles();
  const [data, setData] = React.useState({
    id: null,
    name: null,
    barcode: null,
    reference: null,
    description: null,
    purchasePrice: null,
    salePrice: null,
    un: "UN",
    weight: null,
    sell: null,
    location: null,
    category: 1,
    company: 1,
    redirect: false,
    redirectTo: "/products/",
  });

  // Similar ao componentDidMount e componentDidUpdate:
  useEffect(() => {
    async function loadData() {
      
      if (id) {
        await api
          .get(`products/${id}`)
          .then((res) => {
            setData({ ...res.data });
          })
          .catch((err) => {
            console.log("erro: " + err);
          });
      }
    }
    loadData();
    
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      headers: { "Content-Type": "application/json" },
    };
    api.post("/products/", data, options).then((res) => {
      setData({
        redirectTo: "/products/",
        redirect: true
      })
    });
  };

  const handleDelete = async () => {
    await api.delete(`products/${id}`).then(()=> {
      setData({
        redirectTo: "/products/",
        redirect: true
      })
    });
  }

  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };

  return (
    <Card className={classes.root}>
      {data.redirect ? <Redirect to={data.redirectTo} /> : ""}
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            P
          </Avatar>
        }
        title="Cadastro de Produtos"
        subheader={data.name}
      />
      <CardContent>
        <form className={classes.root} onSubmit={(e) => handleSubmit(e)}>
          <div className={classes.row}>
            <FormControl
              fullWidth="true"
              className={classes.margin}
              variant="outlined"
            >
              <InputLabel htmlFor="barcode">Código de Barras</InputLabel>
              <OutlinedInput
                id="barcode"
                value={data.barcode}
                onChange={handleChange("barcode")}
                labelWidth={140}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              fullWidth="true"
              className={classes.margin}
              variant="outlined"
            >
              <InputLabel htmlFor="reference">Referência</InputLabel>
              <OutlinedInput
                id="reference"
                value={data.reference}
                onChange={handleChange("reference")}
                labelWidth={140}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div className={classes.row}>
            <FormControl
              fullWidth="true"
              className={classes.margin}
              variant="outlined"
            >
              <InputLabel htmlFor="name">Nome do Produto</InputLabel>
              <OutlinedInput
                id="name"
                value={data.name}
                onChange={handleChange("name")}
                labelWidth={120}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div className={classes.row}>
            <FormControl
              fullWidth="true"
              className={classes.margin}
              variant="outlined"
            >
              <InputLabel htmlFor="description">Descrição</InputLabel>
              <OutlinedInput
                id="description"
                value={data.description}
                onChange={handleChange("description")}
                labelWidth={70}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div className={classes.row}>
            <FormControl
              fullWidth="true"
              className={classes.margin}
              variant="outlined"
            >
              <InputLabel htmlFor="un">Unidade</InputLabel>
              <OutlinedInput
                id="un"
                value={data.un}
                onChange={handleChange("un")}
                labelWidth={60}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
              />
            </FormControl>
            <FormControl
              fullWidth="true"
              className={classes.margin}
              variant="outlined"
            >
              <InputLabel htmlFor="description">R$ Compra</InputLabel>
              <OutlinedInput
                id="purchasePrice"
                value={data.purchasePrice}
                onChange={handleChange("purchasePrice")}
                startAdornment={
                  <InputAdornment position="start">R$</InputAdornment>
                }
                labelWidth={80}
              />
            </FormControl>
            <FormControl
              fullWidth="true"
              className={classes.margin}
              variant="outlined"
            >
              <InputLabel htmlFor="salePrice">R$ Venda</InputLabel>
              <OutlinedInput
                id="salePrice"
                value={data.salePrice}
                onChange={handleChange("salePrice")}
                startAdornment={
                  <InputAdornment position="start">R$</InputAdornment>
                }
                labelWidth={80}
              />
            </FormControl>
            <FormControl
              fullWidth="true"
              className={classes.margin}
              variant="outlined"
            >
              <InputLabel htmlFor="weight">Peso</InputLabel>
              <OutlinedInput
                id="weight"
                value={data.weight}
                onChange={handleChange("weight")}
                startAdornment={
                  <InputAdornment position="start">KG</InputAdornment>
                }
                labelWidth={60}
              />
            </FormControl>
          </div>
          <div className={classes.row}>
            <FormControl
              fullWidth="true"
              className={classes.margin}
              variant="outlined"
            >
              <InputLabel htmlFor="location">Localização</InputLabel>
              <OutlinedInput
                id="location"
                value={data.location}
                onChange={handleChange("location")}
                labelWidth={90}
                startAdornment={
                  <InputAdornment position="start"></InputAdornment>
                }
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
            <FormControl fullwidth="true" className={classes.margin}>
              <Button
                type="button"
                onClick={() => handleDelete()}
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
      </CardContent>
    </Card>
  );
}
