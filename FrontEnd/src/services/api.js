export async function fetchPortsActivity(
    page = 1,
    pageSize = 50,
    filters = {}
) {
    const queryParams = new URLSearchParams({
        page: page.toString(),
        page_size: pageSize.toString(),
    });

    if (filters.portname) queryParams.append("portname", filters.portname);
    if (filters.country) queryParams.append("country", filters.country);
    if (filters.startDate) queryParams.append("data_inicial", filters.startDate);
    if (filters.endDate) queryParams.append("data_final", filters.endDate);

    const response = await fetch(
        `http://127.0.0.1:8000/port_activity?${queryParams.toString()}`
    );
    if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
    }
    return await response.json();
}

export async function fetchPortActivityCount(filters = {}) {
    const queryParams = new URLSearchParams();

    if (filters.portname) queryParams.append("portname", filters.portname);
    if (filters.country) queryParams.append("country", filters.country);
    if (filters.startDate) queryParams.append("data_inicial", filters.startDate);
    if (filters.endDate) queryParams.append("data_final", filters.endDate);

    const response = await fetch(
        `http://127.0.0.1:8000/port_activity/count?${queryParams.toString()}`
    );

    if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
    }

    const data = await response.json();
    return data.total;
}


export async function fetchPortDetails(objectId) {
    const response = await fetch(`http://127.0.0.1:8000/port_activity/${objectId}`);

    if (!response.ok) {
        throw new Error(`Erro ao buscar detalhes: ${response.status}`);
    }

    return await response.json();
}
