const CPF_LENGHT = 11
const FACTORY_FIRST_DIGIT = 10
const FACTORY_SECOND_DIGIT = 11

export function validateCpf(cpf: string) {
    if (!cpf) return false
    cpf = removeSpecialCharacters(cpf)
    if (cpf.length !== CPF_LENGHT) return false
    if (allDigitsAreTheSame(cpf)) return false;
    const digit1 = calculateDigit(cpf, FACTORY_FIRST_DIGIT)
    const digit2 = calculateDigit(cpf, FACTORY_SECOND_DIGIT)

    return extractLastDigit(cpf) === `${digit1}${digit2}`;
}

function removeSpecialCharacters(cpf: string): string {
    return cpf.replace(/\D/g,"");
}

function allDigitsAreTheSame(cpf: string): boolean {
    const [firstDigit] = cpf
    return [...cpf].every(digit => digit === firstDigit)
}

function calculateDigit(cpf: string, factor: number) {
    let total = 0;
    for (const digit of cpf) {
        if (factor > 1) total += parseInt(digit) * factor--
    }
    const remainder = total % 11;
    return (remainder < 2) ? 0 : 11 - remainder
}

function extractLastDigit(cpf:string){
    return cpf.slice(9)
}