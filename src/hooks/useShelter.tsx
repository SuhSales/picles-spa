import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query"
import { getShelter } from "../services/shelter/getShelter"
import { Ishelter } from "../interfaces/shelter"

export function useShelter(
    options?: Partial<UseQueryOptions<Ishelter, Error>>
): UseQueryResult<Ishelter, Error> {
    const result = useQuery({
        staleTime: Infinity,
        ...options,
        queryKey: ['get-shelter'],
        queryFn: () => getShelter(),
    })
    return result
}
