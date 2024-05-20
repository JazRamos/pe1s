import { Router } from "express";
const routerCart = Router();
import CartManager from "../manager/cartManager.js";
import { __dirname } from "../path.js";

const cartManager = new CartManager(`${__dirname}../database/carts.json`);

routerCart.get('/:cId', async (req, res, next) => {
    try {
        const { cId } = req.params;
        const cart = await cartManager.getCartById(cId);
        res.json(cart);
        console.log(cart);
    } catch (error) {
        next(error);
    }
})


routerCart.post('/', async (req, res, next) => {
    try {
        const cartResp = await cartManager.createCart();
        res.json(cartResp);
    } catch (error) {
        next(error);
    }
})

routerCart.post('/:cId/product/:pId', async (req, res, next) => {
    try {
        const { cId } = req.params;
        const { pId } = req.params;
        const response = await cartManager.saveProductToCart(cId, parseInt(pId));
        res.json(response);
    } catch (error) {
        next(error)
    }

})



export default routerCart;