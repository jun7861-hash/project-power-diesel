const router = require("express").Router();
const AWS = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.REGION,
});

const s3 = new AWS.S3();

router.get("/download/:filename", async (req, res) => {
  const filename = req.params.filename;
  const file = await s3
    .getObject({ Bucket: process.env.BUCKET, Key: filename })
    .promise();
  try {
    res.send(file.Body);
  } catch (error) {
    res.status(500).send({
      message: "failed",
      error: error,
    });
  }
});

router.get("/landing", (req, res) => {
  res.status(200).send({
    message: "success",
  });
});

router.post("/validate", (req, res) => {
  res.status(200).send({
    message: "success",
    event: req.body.validate,
  });
});

module.exports = router;
