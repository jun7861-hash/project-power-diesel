const router = require("express").Router();
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "AKIA4S43ABU4XEKQI65S",
  secretAccessKey: "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",
  region: "ap-southeast-1",
});

const s3 = new AWS.S3();

router.get("/download/:filename", async (req, res) => {
  const filename = req.params.filename;
  const file = await s3
    .getObject({ Bucket: "junpoc-namespace", Key: filename })
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
