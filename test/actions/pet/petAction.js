import { assert } from 'chai';
import { Pet } from '../../../src/model/Pet';
import { Category } from '../../../src/model/Category'
import { Tag } from '../../../src/model/Tag'
import fs from 'fs'

export async function createAPet(petApiInstance, petName, photoUrls, category, tags, status) {
    let resp;
    const min = 5555555;
    const max = 6666666;

    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

    // make pet body
    let pet = new Pet(petName, photoUrls);
    pet.id = randomInt;
    pet.category = category;
    pet.tags = tags;
    pet.status = status;

    // add pet
    try{
      resp = await petApiInstance.addPet(pet);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }

    return resp;
}

export async function deleteAPet(petApiInstance, petID) {
    let resp;

    // delete a pet
    try{
      resp = await petApiInstance.deletePet(petID);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }

    return resp;
}

export async function updateAPet(petApiInstance, pet) {
  let resp;

  // update a pet
  try{
    resp = await petApiInstance.updatePet(pet);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }

  return resp;
}

export async function createAnImageBlob(imagePath) {
  let data;

  try {
    // Read the contents of a file synchronously
    data = fs.readFileSync(require.resolve(imagePath));
  } catch (err) {
    console.error('Error reading the file:', err);
  }

  // Create a Blob-like object from the file data
  return new Blob([data], { type: 'image/jpeg' });
}