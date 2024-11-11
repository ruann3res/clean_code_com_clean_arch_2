import axios from 'axios'

axios.defaults.validateStatus = function (status) {
    return true;
}

test("Deve criar uma conta para o passageiro", async function(){
    const inputSignup = {
        name: "John Doe",
        email: `Ruanteste${Math.random()}@gmail.com`,
        cpf: "97456321558",
        isPassenger:true
    }

    const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup)
    const outputSingup = responseSignup.data
    expect(outputSingup.accountId).toBeDefined();
    const responseGetUserById = await axios.get(`http://localhost:3000/signup/${outputSingup.accountId}`)
    const outputGetUserById = responseGetUserById.data
    expect(outputGetUserById.name).toBe(inputSignup.name)
    expect(outputGetUserById.email).toBe(inputSignup.email)
    expect(outputGetUserById.cpf).toBe(inputSignup.cpf)
})

test("Deve criar uma conta para o passageiro", async function(){
    const inputSignup = {
        name: "John Doe",
        email: `Ruanteste${Math.random()}@gmail.com`,
        cpf: "97456321558213",
        isPassenger:true
    }

    const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup)
    const outputSingup = responseSignup.data
    expect(responseSignup.status).toBe(422)
    expect(outputSingup.message).toBe("CPF must be valid")
   
})