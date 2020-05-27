# CelFactor-API

test it! https://celfactor-api.glitch.me/v2/


#routes

https://celfactor-api.glitch.me/v2/companies/
  acepts POST, GET, PUT, DELETE
    GET (with no other parameter):
      Could displays all companies registered in the platform, but in fact that nobody, except the developers should have access to all         companies data, i had blocked it.
    GET (with the company id supplied in the query):
      Returns a JSON formatted response with the information of that specific company.
    POST:
      Accepts a JSON formatted request body with the information of the company to add.
    PUT (with the company id supplied in the query):
      Accepts a JSON formatted request body with the information of the company to update.
    DELETE (with the company id supplied in the query):
      Deletes the specified company.
      
https://celfactor-api.glitch.me/v2/products/
https://celfactor-api.glitch.me/v2/employees/
https://celfactor-api.glitch.me/v2/invoices/

