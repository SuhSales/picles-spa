import { useQuery } from "@tanstack/react-query";
import { GetPetsRequest, GetPetsResponse } from "../interfaces/pet";
import { getPets } from "../services/pets/getPets";

interface IUsePetList{
    data?: GetPetsResponse
    isLoading: boolean
}

export function usePetList(params: GetPetsRequest): IUsePetList {
const { data, isLoading } = useQuery({
    queryKey: ['gets-pets', params],
    queryFn: () => getPets(params),
})
return {data, isLoading}
}