import { Header } from "../../components/common/Header";
import { Grid } from "../../components/layout/Grid/Grid";
import styles from "./Pets.module.css";
import { Card } from "../../components/common/Card";
import { Skeleton } from "../../components/common/Skeleton";
import { Pagination } from "../../components/common/Pagination";
import { useSearchParams } from "react-router-dom";
import { usePetList } from "../../hooks/usePetsList";
import { Select } from "../../components/common/Select";
import { Button, ButtonVariant } from "../../components/common/Button";
import { filterColumns } from "./Pets.constant";
import { ChangeEvent, FormEvent, useState } from "react";
import { GetPetsRequest } from "../../interfaces/pet";

export function Pets() {
    const [isButtonEnable, setIsButtonEnable] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    const urlParams = {
        page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
        type: searchParams.get('type') ?? '',
        size: searchParams.get('size') ?? '',
        gender: searchParams.get('gender') ?? '',
    }

    const { data, isLoading } = usePetList(urlParams)

    function checkButtonStatus(event: ChangeEvent<HTMLFormElement>) {
        const {type, size, gender} = getFormValue(event.target.form)

        if(type !== urlParams.type || 
           size !== urlParams.size ||
        gender !== urlParams.gender
    ) {
        setIsButtonEnable(true)
    } else {
        setIsButtonEnable(false)
    }
}   

    function changePage(page: number) {
        setSearchParams((params) => {
            params.set('page', String(page))
            return params
        })
    }

    function getFormValue(form: HTMLFormElement) {
        const formData = new FormData(form)
        return Object.fromEntries(formData)
      }

    function updateSearchParams(urlParams: GetPetsRequest) {
        const fields: (keyof GetPetsRequest)[] = ['type', 'size', 'gender']
        const newParams = new URLSearchParams()
    
        fields.forEach((field) => {
          if (urlParams[field]) {
            newParams.set(field, String(urlParams[field]))
          }
        })
        newParams.set('page', '1')
    
        return newParams
      }
    
      function applyFilters(event: FormEvent) {
        event.preventDefault()
    
        const formValues = getFormValue(event.target as HTMLFormElement)
        const newSearchParams = updateSearchParams(formValues)
    
        setSearchParams(newSearchParams)
        setIsButtonEnable(false)
      }

    return (
        <Grid>
            <div className={styles.container}>
                <Header />

                <form className={styles.filters} onSubmit={applyFilters} onChange={checkButtonStatus}> 
                    <div className={styles.columns}>
                        {filterColumns.map((filter) =>(
                            <div key={filter.name} className={styles.colum}>
                                <Select 
                                label={filter.title} 
                                defaultValue={urlParams[filter.name]}
                                name={filter.name}
                                options={filter.options}
                                />
                                </div>
                        ))}
                    </div>
                    <Button type="submit"
                    variant={
                        isButtonEnable ? ButtonVariant.Default : ButtonVariant.Disable
                    }
                   >
                        Buscar
                    </Button>
                </form>

                {isLoading && (
                    <Skeleton containerClassName={styles.skeleton} count={10} />
                )}
                <main className={styles.list}>
                    {
                        data?.items.map((pet) => (
                            <Card
                                key={pet.id}
                                href={`/pets/${pet.id}`}
                                text={pet.name}
                                thumb={pet.photo}
                            />
                        ))}
                </main>
                {data?.currentPage && (
                    <Pagination
                        currentPage={data.currentPage}
                        totalPages={data.totalPages}
                        onPageChange={(number) => changePage(number)}
                    />
                )}
            </div>
        </Grid>
    )
}