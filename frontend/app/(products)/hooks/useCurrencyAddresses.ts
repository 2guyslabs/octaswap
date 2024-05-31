import { Currency } from '@/constants/currency'
import { NATIVE_TO_WRAPPED } from '@/constants/wrapped'
import { splitCurrencyType } from '@/lib/utils'
import { useChainId } from 'wagmi'
import useWrapped from './useWrapped'

export default function useCurrencyAddresses(currencyA: Currency | undefined, currencyB: Currency | undefined) {
  const wrapped = useWrapped()

  const { native: nativeA, token: tokenA } = splitCurrencyType(currencyA)
  const { native: nativeB, token: tokenB } = splitCurrencyType(currencyB)

  const addressA = nativeA ? wrapped : (tokenA?.address as `0x${string}`)
  const addressB = nativeB ? wrapped : (tokenB?.address as `0x${string}`)

  return { nativeA, nativeB, tokenA, tokenB, addressA, addressB }
}
