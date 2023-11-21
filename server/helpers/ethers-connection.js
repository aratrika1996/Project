import { ethers } from "ethers"

const getProvider = () => {
    try {
        const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
        return provider
    }
    catch {
        console.log("Hardhat is not connected locally")
    }
}

export default getProvider