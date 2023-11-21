import { faker } from '@faker-js/faker'
import { ethers } from 'ethers'
import getProvider from '../helpers/ethers-connection.js'

const getAddresses = async() => {
    try {
        const provider = getProvider()
        const ethAddresses = await provider.listAccounts()
        return ethAddresses
    }
    catch {
        const ethAddresses = []
        return ethAddresses
    }
}

const getFakeAddresses = () => {
    const fakeAddresses = faker.helpers.uniqueArray(faker.finance.ethereumAddress, 10)
    return fakeAddresses
}

const getBalance = async(address) => {
    try {
        const provider = getProvider()
        const balanceWei = await provider.getBalance(address)
        const balance = ethers.utils.formatEther(balanceWei)

        return {address : address, balance : balance}
    }
    catch {
        console.log('Error')
    }
}

const getFakeAccountDetails = () => {
    const fakeAddress = faker.finance.ethereumAddress()
    const fakeBalance = 100

    return {address: fakeAddress, balance: fakeBalance}
}

export { getAddresses, getFakeAddresses, getBalance, getFakeAccountDetails }