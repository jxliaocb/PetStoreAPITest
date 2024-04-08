
/*
* Swagger Petstore
* This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.
*
* OpenAPI spec version: 1.0.6
* Contact: apiteam@swagger.io
*
* NOTE: This class is auto generated by the swagger code generator program.
* https://github.com/swagger-api/swagger-codegen.git
*
* Swagger Codegen version: 3.0.48
*
* Do not edit the class manually.
*
*/

import * as SwaggerPetstore from '../../src/index.js'
import { expect } from 'chai'
import * as petMetadata from '../../testData/petMetadata.json'
import * as PetAction from '../../test/actions/pet/petAction.js'

'use strict';

let petApiInstance;


describe('(package)', function() {
  describe('@Pet', function() {
    before('Setup api-key and apiCLient instance', function() {
      let apiClientInstance = new SwaggerPetstore.ApiClient();
      apiClientInstance.authentications['api_key'].apiKey = process.env.API_KEY || 'special-key';
      petApiInstance = new SwaggerPetstore.PetApi(apiClientInstance);
    })
    describe('add a new pet to the store', async function() {
      let petContext = {};
      it('should call addPet successfully', async function() {
        const resp = await PetAction.createAPet(petApiInstance,
                                                              petMetadata.petName,
                                                              petMetadata.photoUrls,
                                                              petMetadata.category,
                                                              petMetadata.tags,
                                                              petMetadata.status);

        petContext.petID = resp.body.id;

        expect(resp.statusCode).to.equal(200);
        expect(resp.body.id).is.a('number');
        expect(resp.body.name).to.equal(petMetadata.petName);
        expect(resp.body.photoUrls).to.deep.equal(petMetadata.photoUrls);
        expect(resp.body.category).to.deep.equal(petMetadata.category);
        expect(resp.body.tags).to.deep.equal(petMetadata.tags);

      });
      after('clean up test data(remove the added pet)', async function() {
        const resp = await PetAction.deleteAPet(petApiInstance, petContext.petID);

        expect(resp.statusCode).to.equal(200);
      })
    });
    describe('operations on an existing pet in the store', async function() {
      let petContext = {};

      before('setup test data(add a new pet to the store)', async function() {
        const resp = await PetAction.createAPet(petApiInstance,
          petMetadata.petName,
          petMetadata.photoUrls,
          petMetadata.category,
          petMetadata.tags,
          petMetadata.status);

        petContext.petID = resp.body.id;

      });

      it('filter a pet by its status', async function() {
        let resp;

        try{
          resp = await petApiInstance.findPetsByStatus([petMetadata.status]);
        }catch(err) {
          console.error(err);
          throw new Error(err);
        }
        let filteredPet = resp.body.filter((obj)=>obj.id===petContext.petID)[0];

        expect(resp.statusCode).to.equal(200);
        expect(filteredPet.id).is.a('number');
        expect(filteredPet.id).to.equal(petContext.petID);
        expect(filteredPet.name).to.equal(petMetadata.petName);
        expect(filteredPet.photoUrls).to.deep.equal(petMetadata.photoUrls);
        expect(filteredPet.category).to.deep.equal(petMetadata.category);
        expect(filteredPet.tags).to.deep.equal(petMetadata.tags);

      });
      it('find a pet by its ID', async function() {
        let resp;

        try{
          resp = await petApiInstance.getPetById(petContext.petID);
        }catch(err) {
          console.error(err);
          throw new Error(err);
        }

        expect(resp.statusCode).to.equal(200);
        expect(resp.body.id).is.a('number');
        expect(resp.body.name).to.equal(petMetadata.petName);
        expect(resp.body.photoUrls).to.deep.equal(petMetadata.photoUrls);
        expect(resp.body.category).to.deep.equal(petMetadata.category);
        expect(resp.body.tags).to.deep.equal(petMetadata.tags);

      });
      it('upload an image to the pet', async function() {
        let resp;
        let opts = {additionalMetadata: petMetadata.additionalMetadata};
        const imageBlob = PetAction.createAnImageBlob(petMetadata.local2ndImagePath);
        opts.file = imageBlob;

        try{
          resp = await petApiInstance.uploadFile(petContext.petID, opts);
        }catch(err) {
          console.error(err);
          throw new Error(err);
        }

        const regexPattern = new RegExp(`additionalMetadata: ${petMetadata.additionalMetadata}\\nFile uploaded to`);

        expect(resp.statusCode).to.equal(200);
        expect(resp.body.type).to.equal('unknown');
        expect(regexPattern.test(resp.body.message)).to.be.true;

      });
      it('update a pet with form data', async function() {
        let resp;
        let opts = {name: petMetadata.petNameNew, status: petMetadata.statusPending};

        try{
          resp = await petApiInstance.updatePetWithForm(petContext.petID, opts);
        }catch(err) {
          console.error(err);
          throw new Error(err);
        }

        expect(resp.statusCode).to.equal(200);
        expect(resp.body.code).to.equal(200);
        expect(parseInt(resp.body.message)).to.equal(petContext.petID);

        try{
          resp = await petApiInstance.getPetById(petContext.petID);
        }catch(err) {
          console.error(err);
          throw new Error(err);
        }

        expect(resp.statusCode).to.equal(200);
        expect(resp.body.name).to.equal(petMetadata.petNameNew);
        expect(resp.body.status).to.equal(petMetadata.statusPending);

      });
      it('update name of the pet', async function() {
        let body = new SwaggerPetstore.Pet(petMetadata.petNameNew, petMetadata.photoUrls);
        const resp = await PetAction.updateAPet(petApiInstance, body);

        expect(resp.statusCode).to.equal(200);
        expect(resp.body.name).to.equal(petMetadata.petNameNew);

      });
      it('update status of the pet to sold', async function() {
        let body = new SwaggerPetstore.Pet(petMetadata.petName, petMetadata.photoUrls);
        body.status = petMetadata.statusSold;
        const resp = await PetAction.updateAPet(petApiInstance, body);

        expect(resp.statusCode).to.equal(200);
        expect(resp.body.status).to.equal(petMetadata.statusSold);

      });
      it('update photoUrls of the pet', async function() {
        let body = new SwaggerPetstore.Pet(petMetadata.petName, petMetadata.photoUrlsNew);
        const resp = await PetAction.updateAPet(petApiInstance, body);

        expect(resp.statusCode).to.equal(200);
        expect(resp.body.photoUrls).to.deep.equal(petMetadata.photoUrlsNew);

      });
      it('update tags of the pet', async function() {
        let body = new SwaggerPetstore.Pet(petMetadata.petName, petMetadata.photoUrls);
        body.tags = petMetadata.tagsNew;
        const resp = await PetAction.updateAPet(petApiInstance, body);

        expect(resp.statusCode).to.equal(200);
        expect(resp.body.tags).to.deep.equal(petMetadata.tagsNew);

      });
      after('clean up test data(delete the pet from the store)', async function() {
        const resp = await PetAction.deleteAPet(petApiInstance, petContext.petID);

        expect(resp.statusCode).to.equal(200);

      })

    });
    describe('delete a pet from the store', async function() {
      let petContext = {};
      before('setup test data(add a new pet to the store)', async function() {
        let resp = await PetAction.createAPet(petApiInstance,
                                                              petMetadata.petName,
                                                              petMetadata.photoUrls,
                                                              petMetadata.category,
                                                              petMetadata.tags);

        petContext.petID = resp.body.id;
      });
      it('delete an existing pet', async function() {
        let resp = await PetAction.deleteAPet(petApiInstance, petContext.petID);

        expect(resp.statusCode).to.equal(200);
      });
    });
  });
});
