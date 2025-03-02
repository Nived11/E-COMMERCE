import productSchema from "../Models/product.model.js";


export async function addProduct(req, res) {
    try {
        const { userId, productname, category, Brand, modelno, price, quantity, warranty, description, specifications, productimages,block=false } = req.body;
        console.log(userId, productname, category, Brand, modelno, price, quantity, warranty, description, specifications);
        if (!(productname && category && Brand && modelno && price && quantity && warranty && description && specifications&&productimages)) {
            return res.status(404).send({ msg: "Fields are empty" });
        }
        await productSchema.create({ userId, productname, category, Brand, modelno, price, quantity, warranty, description, specifications, productimages,block });
        res.status(201).send({ msg: "Product added successfully" });
    } catch (error) {
        res.status(500).send({ error });
    }
}

export async function allProducts(req, res) {
    try {
      const {userId}=req.body;
      console.log("userr id geting",userId);
      if(!userId){
        return res.status(404).send({ msg: "userId not found" });
      }
      const products = await productSchema.find({
        userId:{$ne:userId}
      });
      if (!products || products.length === 0) {
        return res.status(404).send({ msg: "No products found" });
      }
      return res.status(200).send(products);
    } catch (error) {
      console.error(error);
        return res.status(500).send({ error });
    }
}

export async function getSellerProducts (req, res) {
    try {
      const { id } = req.params;
      console.log("Fetching addresses for user:", id);
      const products = await productSchema.find({ userId: id });
      if (!products || products.length === 0) {
        return res.status(404).send({ msg: "No products found" });
      }
      return res.status(200).send(products);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error});
    }
  }
  export async function getoneProduct(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      
      const product = await productSchema.findById(id);
      if (!product) {
        return res.status(404).send({ msg: "Product not found" });
      }
      return res.status(200).send(product);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error });
    }
  }

  export async function updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { productname, category, Brand, modelno, price, quantity, warranty, description, specifications, productimages } = req.body;
        console.log(id, productname, category, Brand, modelno, price, quantity, warranty, description, specifications, productimages);
     
      const updatedProduct = await productSchema.findById(id);
      if (!updatedProduct) {
        return res.status(404).send({ msg: "Product not found" });
      }
    await productSchema.findByIdAndUpdate(id, { productname, category, Brand, modelno, price, quantity, warranty, description, specifications, productimages });
      res.status(200).send({ msg: "Product updated successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error });
    }
  }

  export async function deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const deletedProduct = await productSchema.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).send({ msg: "Product not found" });
      }
      res.status(200).send({ msg: "Product deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error });
    }
  }