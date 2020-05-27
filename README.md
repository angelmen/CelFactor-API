# CelFactor-API

test it! https://celfactor-api.glitch.me/v2/


# Routes

https://celfactor-api.glitch.me/v2/companies/
<br />
  acepts POST, GET, PUT, DELETE
	<br />
    <br />GET (with no other parameter):
		<br />
      Could displays all companies registered in the platform, but in fact that nobody, except the developers should have access to all         companies data, i had blocked it.
    <br /><br />	GET (with the company id supplied in the query):
      <br />Returns a JSON formatted response with the information of that specific company.
    <br /><br />POST:
      <br />Accepts a JSON formatted request body with the information of the company to add.
    <br /><br />PUT (with the company id supplied in the query):
      <br />Accepts a JSON formatted request body with the information of the company to update.
    <br /><br />DELETE (with the company id supplied in the query):
      <br />Deletes the specified company.
      
<br />https://celfactor-api.glitch.me/v2/products/
<br />https://celfactor-api.glitch.me/v2/employees/
<br />https://celfactor-api.glitch.me/v2/invoices/

