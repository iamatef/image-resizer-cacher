1- Project has been prettified using pretteier, linted and jasmine tests works, check screenshot https://monosnap.com/file/9dORHIaloQ3eRHyn7MOM4cVipZzMpq

2- To test npm run start then visit the endpoint 

http://localhost:3000/api/images?filename=girl&width=200&height=200 [should serve a correct image]

http://localhost:3000/api/images?filename=missing&width=200&height=200 [Missing image provided should return 400 ERROR]

http://localhost:3000/api/images?filename=defected&width=200&height=200 [Defected image provided should return 500 ERROR]

3- a specific version [set in package.json] of sharp is used as latest one contained a bug 