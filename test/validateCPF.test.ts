import { validateCpf } from "../src/validateCPF"

test.each([
    "974.563.215-58",
    "877.482488-00",
    "71428793860",
])("Deve testar se o CPF é valido %s",(cpf:string)=>{
     const isValid = validateCpf(cpf)
     expect(isValid).toBe(true)
})

test.each([
    "",
    null,
    undefined,
    "123456789012345678",
    "123456",
    "11111111111"
])("Deve testar se o CPF é invalido %s",(cpf:any)=>{
     const isValid = validateCpf(cpf)
     expect(isValid).toBe(false)
})