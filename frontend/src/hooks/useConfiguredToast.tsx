import {useToast} from "@chakra-ui/react";

export default function useConfiguredToast() {
  const toast = useToast()

  function errorToast(title: string, description?: string) {
    return toast({
      title: title,
      description: description,
      status: 'error',
      duration: 4000,
      isClosable: true
    })
  }

  function successToast(title: string, description?: string) {
    return toast({
      title: title,
      description: description,
      status: 'success',
      duration: 4000,
      isClosable: true
    })
  }

  function infoToast(title: string, description?: string) {
    return toast({
      title: title,
      description: description,
      status: 'info',
      duration: 4000,
      isClosable: true
    })
  }

  function warningToast(title: string, description?: string) {
    return toast({
      title: title,
      description: description,
      status: 'warning',
      duration: 4000,
      isClosable: true
    })
  }

  return {errorToast, successToast, infoToast, warningToast}
}