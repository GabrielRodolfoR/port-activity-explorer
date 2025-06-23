export async function fetchPortsActivity(page = 1, pageSize = 50, filters = {}) {
    const queryParams = new URLSearchParams({
        page,
        page_size: pageSize,
        ...filters
    })

    const response = await fetch(`http://127.0.0.1:8000/port_activity?${queryParams}`);
    if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
    }
    return await response.json();
}


export async function fetchPortActivityCount(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await fetch(`http://127.0.0.1:8000/port_activity/count?${params}`);
    if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
    }
    const data = await response.json();
    return data.total;
}
