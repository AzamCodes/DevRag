// Local embeddings using TensorFlow Universal Sentence Encoder
import * as use from '@tensorflow-models/universal-sentence-encoder';
import * as tf from '@tensorflow/tfjs-node';

let model;

export async function getSingleEmbedding(text) {
  if (!model) model = await use.load();
  const embeddings = await model.embed([text]);
  const array = await embeddings.array();
  return array[0]; // return vector
}
