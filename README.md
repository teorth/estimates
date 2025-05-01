# estimates
Code to automatically prove or verify estimates in analysis

Initially we will focus on proving estimates such as
$$ \frac{N_0 \min(N_2, N_3, N_4, N_{234})^{1/2}}{\max(N_0,N_1,N_5)^{1/2} \max(N_2,N_3,N_4)^{1/2}} \lesssim N_0 \max(N_0,N_1,N_2,N_3,N_4,N_5)^{-1/2}$$

where we impose Littlewood-Paley type conditions on the variables, for instance that $N_2, N_3, N_4, N_{234}$ obey a triangle inequality.