import { useWeb3React } from '@web3-react/core'
import React, { useState, useEffect, useRef } from 'react'
import Web3 from 'web3'

const BlockContext = React.createContext(0)

const BlockContextProvider = ({ children }) => {
  const previousBlock = useRef(0)
  const [block, setBlock] = useState(0)
  const { library } = useWeb3React<Web3>()

  useEffect(() => {
    const interval = setInterval(async () => {
      if (library) {
        const blockNumber = await library?.eth.getBlockNumber()
        if (blockNumber !== previousBlock.current) {
          previousBlock.current = blockNumber
          setBlock(blockNumber)
        }
      }
    }, 6000)

    return () => clearInterval(interval)
  }, [setBlock, library])

  return <BlockContext.Provider value={block}>{children}</BlockContext.Provider>
}

export { BlockContext, BlockContextProvider }
