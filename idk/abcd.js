    
    
    
    CompanyData: null,
    
    
    fetchHome: async (accessToken) => {
        try {
            console.log('inside fetchHome');
            const res = await axiosInstance.get("/organization/home/", {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            console.log('fetchHome over', res.data);

            const Company = res.data;
            set({ CompanyData: Company });

            // Store the new data in localStorage
            localStorage.setItem('CompanyData', JSON.stringify(Company));
        } catch (error) {
            console.error("Error fetching home data:", error);
        }
    },