export async function fetchUser(id: number): Promise<{ data: string }> {
    const response = await fetch(`/api/user/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ }),
    })
    const result = await response.json()
  
    return result
  }