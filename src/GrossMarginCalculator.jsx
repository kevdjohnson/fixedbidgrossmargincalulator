import { useState, useMemo } from "react";
import { Plus, Trash2, TrendingUp, TrendingDown } from "lucide-react";

const DC_COLORS = {
  crimson: "#912121",
  navy: "#002060",
  charcoal: "#323232",
  teal: "#009999",
};

const DC_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABdwAAADoCAMAAADCONZKAAABLFBMVEUAAABcKysyMjIyMjJJLi6UISEyMjIyMjKUISEyMjIyMjIyMjIyMjIyMjIyMjIyMjKUISEyMjIyMjIyMjIyMjIyMjKUISEyMjKUISEyMjIyMjKUISGUISEyMjKUISEyMjKUISGUISEyMjIyMjIyMjKUISEyMjKUISEyMjIyMjIyMjIyMjIyMjKUISEyMjKUISEyMjKUISEyMjKUISEyMjIyMjIyMjKUISEyMjIyMjIyMjIyMjIyMjIyMjIyMjKUISEyMjKUISEyMjKUISGUISEyMjIyMjKUISGUISEyMjIyMjKUISGUISGUISGUISEyMjKUISEyMjKUISEyMjKUISGUISGUISGUISGUISGUISGUISGUISGUISGUISEyMjKUISGUISGUISGUISEyMjL5KIIBAAAAYnRSTlMABPcMBvvcZvbX5fshufKW8cU+Dxzt4nJD6SwJZY4yEiE+wTHgDZ3Ms0Oqe4LZCMdQwWxLORe8FjQl0sopd1Yczq5c6LqHrygRokdy7NGES4thWKace2leUrM4lqMtfpCpk+rddC8AAFBeSURBVHja7N1/V9JQHMfxO9zNHU1cP0RshpuJ1KlltGyd0hYCjRogESAgHOjy/J9D2MlOCSgg2+7W5/V3/3zPyfe53t17JQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALd/pxxDPih4JRvaqpEgAAmMen6Ig14oeELl+V3SYAADCPO4MR94gfEjF2lYS4+0IQRVFRCnbCqJ790jTiWrurFhRFEQUSbsLF7EnTTmhxo3k5v9a1LmYXhbBPD2GCuMMfotXVmo1yJ3egZykbRYv6QabnnBlt21JIyBTURLy5PRxez0rjZpdjpXTr3KkabbVAAPiHuLug0G1r7USwEmBq273Mwdiwje9czTFMEg5KYrvSz6WmHT6V69SbXQLAN8R94dR6To9lY3quHIgPwklbq5ZbMUopmxGl2VbZ6AY58YqqbddS0jyzy6nzhpEwsVEDvELcF0ytyOySfG4TvtnVSiaVpWx+kp7rVYPZd6Vd76SKtxy+5mhJAsAhxH2xEul/YpFuE04JZqLa0WVK2a1RKqcdzRJJgBS61VpMouz2qCTn6podum8QEHiI+0JpV6eIGYRLhUouS9kCyenzZlAW8GLbyehskaRSxyC3IRwevfn6cXnz+EX+8fr6+uPjb6f3nzzEng9wFXdBjZ855R9DlbLTuDhcoPw3cbdT7KoSnzszqswWjcrZflXlfgVrauWSTNnC/ZirxEsPj+4vr3/+sLe1tRGNRCKrq4NfViPRjY2tlbX86dEhEg/+x71gx52+XpR/f6CilEqSLBezqUzZsE0x9HEXOnQ0eTUut2SHcXcDLf0wuJz3N6Fbz11O7n/cd55t7u/uDa63srZ+coS+g69x15yWTtkksXSlaoU87u1x3ShqhEPDuLuDyqW6zecpUNFqjuxF+RV3YefR66d3tiKDaURX1l4fLREAP+IuWo10kd70Y69nmpYY4rhXKBujQjikSsw9xT6H52eEeHlk7eFX3He+5t9GBzNZ2f+4QwA8j3uiXJr21/aKpoQ17maOjaMTDqkyc5OsO3ydHzGbrZFFu09xX3qSf781mN3Gh+OHgTqRBDPjLu5itzbDkohmW/FkOOOuptg4RR43KYZxd1mxp3GzU2w1UmyEP3F/ebofGcxrL4/dd/Aw7nYly2Yj9RNCGOPe1cdXjsfzMu7HndHYuc3FStNspCQ2yp+4v9oa3Mb74yXkHbyJe7JaomxWNGOGMe52kOIuMQ/INc33zRnb0dlY/sR9eXBLH16h7uBF3BMZymZH69NtyzRIoFhpNk6Wx7OBbsR9/OpdJX5KNiYuPgIa98HWc3xZBffjXp3v/IFkh3LPPdln4xwQDg3j7pFi3SJ+SRolNlFQ4z78CX1HAFyNe6FO2Vz6JJQrd7I9tphcTuFd3BnNNYk/1E6RTRbcuA8+fcXWDLgZd7Ems7nQZkjjbsbYKJ3Ll79VmXmHZjTiPat8fdoDHPdBdPMBAXAr7mqLsvmkrXAehRy7dJccwiNVYl6KNZLEY9pN/z+DHPdB9AVurIJbcTdzlM2H1kN6iYmQwujjMn3+7mr6EHdG012BeKjg3PhQe6DjPojs47MquBN3de62s6wa2rgP6/5vNGnfIlwaxt1jetXDulu1KeYLdNwHkXXszIAbcTdblM2rE9bnBy6YZfnvCSp8rtv9iDuTyybxhqilKLsRn3FfjUSj0cjqNHV/jJ0ZWHzczT5l85LjYY47UdqZGGUXaDbj/xUejuLOaKtLvCA6MTYNzuK+urf75fGLzeWTk2/Lr4/z3298DDiy+ZIALDbuSlma6m83xIpj/l3ODHXcL/Lu1DK5TMfRuLh8z8FpmUu0ZIjEddb5dLNxFPfVld38yaO7h0uiQH4THhzevf98d+W6NfzGMk5EwoLjXpXZdaRsuret2baqqna36fQypZhM/znfGNKjkH8oBbPA471Uf1fuQ0VHIS6zc2w6/MR9ZeJ7YMKj/L3r6v6GACwy7gn9+se8G92RlFQrl7fAdSu877kHiE9xZ7LbXyGMqbfb+Yn72wdkIuHh8qfIYJK1uwRgcXE3M5RNQvVyokDGEFWj9etwWi/Ef6wjQIZx90nGJu5RzmQ2LX7ivrZErrO0PHn1vk4AFhf3OpsoW7bIZHYvxuQE4s4D1bcI0nSbuEWZ5VJqYOJOhLsT34CP3CcAP9k707XEkSgMn4IE2WSRRRGRRVFcUGxUBFFUUGgEBAQBlZZJ3f89DNOz9qRCkkqliTO8vztFCp+8fF05dYpO7mQLk+Era5zMq8bRpLaQuxGgSO7MKOv1WrX0Lqjg88gdgLu2YTKXi4WZBazknhsJEjTaYflolfsvH5D9iZin3IVgFyhgvfniM8kdYE/C7qbDRcXMAkZyH0hZwdpNgiL+B9UyxodC7izRo9XM5q6gis8ld3AuS9h9UTGzgI3cS0GpNDYERSySuyGYs9w9bQSMeVV7KscnkzsUvZjI/mKj6gImcpdq4W4dcgu5fyKIL1T5RjDd3D2uVCZvrcdB9nXzN17j2WF3o9UbnTSDHoEVfC8HLOGGZXb3Vk4fVybtx0E3uxZ//f4drHVf+h+9UeXkuJlOlz1zkTvkE5hE4HqxMLOAgdyrTYkkNgBYyP0T8YPc+Uaz0mv1X6Y+H1dLtTAQScZeu4+9Y55Vj3emdh8EBTYEb1sb2XGOAxIomYtVN6emf2x93B4H+Z8rd7iwYBKpRXRfwEDujzz5SW0lF3L/VHyXu7WR3n3vD+KlWjIZVuamcLI0/PiuNa3wlTGwIvnoEbTjad4+btaUfRGICydruc3h4y8n6aCH/zlyR5kQJuCow4IFWuWeJOcj/j0MC7l/KmKe4Kg1yI6TVC597Z/w2u1+vAlsCLcZuL38NigBBSgW7z6+N/mfIHc4imASDwZuYrSAgrnIfYP8SDersJD75yI8LiURUINqr+20ZqOm1xAwIPdmFbTBB0fdWBjoSeaqMdBf7hC9wQTse7BggTa55ypSC+4Luf//KA1uG5rtDtpJvvMa1b7beuWAAfrLHa4DmEBk0ft3gUa5Z8lZbcIt5P6/pDZua1x9T8cZ5HZtt+CpZEsIZmAouZufMQGLH6g4OnOe3h1+fVj23hQuE8sP7oO7FWf0CLSDfFG/c+ups3rvfk6d/z586jmytJf3+ziFI3y/uZ2H5YS3cJOYXnzQWfEzuDl09NvI10sHkd/GvizcTCe+c//l+jTvj5oRaIbznfmd6/W7L98iO/u/z907nbv72/QjnGc+BLqAEHd0ZDZziFbuPYFEeRMIsN/ElMyVYrHqazYbf63GSrlcEgEL0HTc6trgsfU2ua2c7DaPT0aTt/5LdrOUq3FAC/29xKrx7ku/3Zt8L7xrHldG3wsT12KlmgGP/oi10vxcs3tYW273jLJy36qh5A5FEybQAfWY1zuRy4BoKJfX3bnQplD/Sufbs9fiwgRM26n7u1OfnCDXrw+eC+IBQtObyyMtvzlbmVV3yka+NUvCvZopIqDHvP60FEldbrswmcDNdPbFI7bS8F9Mf0QP7iMRt9sdOVjKnBbPkGq5J4nBnW+H9Zc7V+3234+DDf7vUuST3+o8cqCNUnzQfz8hx89Gc9TeWMvBT4KLrW20JsfphkDGmq58bGwarks8N26XeS121xYNam0tH249ydZAFkPJHXYwaQSk1kLOpYRFshvZ9vlV0UclGnP09Cpls5vwLFx2b2RPMoMjX3H13BLAEphs+09U8dcc3Vrav9kO4JkELKklJ419j6LFjttrCZmwDC5b4mqdTYBHPn8m4i1s//NDTYFtS+E8Uvf7ODVyHwokgpugr9zDuWzrJO3hCbGr3JxsxMK0ITneqqSDVplzR3bfsjWkeBLHIk6GCgRZKw3bJ+myVVZGwd12vGa02ojqm2de2T3Z47WU6wzDIIvR5H5qx2LsW6CG6N1zAM/GlLiOgkp8K1/2Q1ghdnfdR3Lk1kFCzo+OwpXafG2+6DzbsEJcO09mlTPfWnLbHFgxjsTVBQca8dW/JVxYikAiElIud+5dINEGXeVeHUzKs4U39TuoJbfWryg1Ep/uVxEoYk1Q/+IgXO22d62CcprtNYPl9+RQS2Vkekz/wRpyO994jIESDCZ33wNJxV/UiO7pXOQEoh0yZjUh8jTitTuwCkLn175/B/+9fYsiOdq+nSHli+zO1WWLSdWt7a8oH958ceAVDS+L5eueFr0j59V5CKvGq2p3qmeso9y58Uda3nvW3X5OVWaPfxyrWkrg062cPnIPx15G6ksKy5WhwfSOXppzyO41Dbnd86ZU7QaTOzyRPLLvU672ZeX5sq7wzqIZtx1TcHMXhb/xdwoq5Hin7N649dWECatn5xQpmnndbcN0OFJ1Wr1zKzsuLIZe7kOihN6Tusmdf7/llequX1Ia9rLtNI2AHnPM5R6O96nPhGt2a2Aoqrc8vd2rlHuXNHxkNwwKMZrczRaS6pxKr46oyXt295mSMZeWA5gOV2od/gDdeVVJOBBRcm950XKJUiwdefX6OtP4TI+dNAVFk9rGmKncW3Q17vRyF3g1m9njoIQhbW02fztmK3eUnWipI/RMqmAoULbJs8nu+uf2crsGSjGc3OEbJpABJXDXBbWKyxwpmRM9gUMfTOH2Eupz/xaSnbAbU+NI5UGGVQfWxnbdrF7t9yaM2co93BQIHOfYyp0eXsnSSdgjUGPdSLKUe9wjaKPxYrDwPn7jf2J25+hze1NN+aPx5L7nwmIiimL7akh9ujzgdJU7drj9AL4DO1ZPYQ/kyJgwPami3nLH9kNQB5e5dGDWci/xxEanYBS5C/x7DGR512LTPjKS3AXPu8HsjrrURe/HY9XHpVpp/4y/qAskhpO7n5RxL5GCC59ptGByR5nJncy535miE1ZgD8m50IY1UNjSW+7YEYmq+uM/mDBmLvcBUahx48hd4Hfl819Wi1L5dtJIchf4kcGWZmBzRN0jUqVxqftABgdJUIXh5I4ipAToBDmKD5gKU4TTV+743Ispsa2ADIdYC8t+veWOTW4EitlaxlgHub8Rn5SageQ+NYRsdi8da8rKj8hIcv+uRGOR65d/Rn93boP21clkDCoxnNyh7sIiXBlZtxeo9RPxUcpdf2x+mM1FCGvha1RvuWPHodK/P1e3Yz3kXjsRCPTCRpL7VHY1kKGvbbd61lBynyqxBAYjm6Y9m0lFoh4GKf9+FG9SjSf3aIhgiAM5tyc0hMtvhpU73vHJfFkP2nL1ku5yx4ElBEpA13asi9zHpGeW3wBDyV1+4QSqVkELuzFDyX2qRDAa4xEvyKGxj8VrkPL8vOHc2/OwkDt4SZKbPYjTizXg6nBGlburg2YbccmEtWAp6i53HLpQ5PaVENZH7tmGICYYN5jcBc8LyFDR+OsRNpTcBX5guBM0cx8eykUvheod79J9VSdxmDtM5H6PxST8M/PrvrRZblJf3ff37q+phHQwtNeNKnfZhRn/NhbjsBcSD1/dkcPDw3v3/mVoVjGPWXe541RUidttWDNe5Qfs7ZaMJnehLHdLA57YlWu3Mun90m61Wh+9yqxdsZ64seQupMdgNJIDSrsr+6HK0Z3jap0YYQmLidwzWMx2EaQ5OjSRY+/2zl3RHzUfIXRkjp7l626bRM69NNPJ3WEK2O3b37EH1GVoUyD0+6V218wLD2Wi+86Po4Ys+1fXW3n/mW867d9bAPuLK1fnIQlR2y8o5e5w/TX17dDsuZtWEciRL8h9Xy5XIBBwmRxq5c59CAQm8NPkznsa5d9oeGSe7DeZ+FdN/zhsefftZW0cK+WSYQ6moHAuNh5+SDYFmHA/Qe681VMO/kHZY+VnVoAarZEY/cJ7I4sUuH1C5/a+IVo2MJH7OiFpmk5BmjsTeXvo3Zko4neWyRo64FTL3WF7iBwsPRXPfn+w/Cud++dLhYJ3Xbo7e1v5MzMAV8ys7txIX2crwkz2TP9sGfzlwgxELg4LZC3uUMh9+/LBfXW3kv996mAuPn2JLNs1vBeGsxSegT2xc7h0l6nXn+6+HLofbgJq5J4cCQQef47c+fTord99rcamvHYf3yqzOsOUszCT8Bv/97i37WFVqk3Be5k8/prOcm80R73Wxlo1l/yrFXD7dkYBOf8KhgNt0lW8p+Xnwr1Z6dZ85r7czk7uzhss5g4k2bKRgl4hEwUx6KxjIepqRdWcTK5CpF6Mon832XLWH0Lymb3wbeXHvrvT63akrjNdIZiF3/vn/1I6W34OJEH5qxBRnEVVcncEbJHMutOHRF/s1qr0T9QXmI1ZeluqI5RaWveb4S9Q1HlxHbkJKJV7jRjF1vSXO+9ptuPVH7rucrnx8F16634PKSl15xvH7bVqDaRJjkckjfBvYd3kznuCvcFmLCf6hFp1cCLptHdjaOtHqiNel62q4UeBhuDQIK8mmMg9SkpxhyCF7xmLCR1EQYL8A/kYbjVzutpCksPLNBkLfM0Qr93ad2EihTOYBTpwYFxwnx6BLBcJkq2v1MjdFSmiGV14bjDVHKAj6XbvVR6I+O0K5Z4jqqWkt9ytx32JLFeSPALIWpXRQ1oQPJXHKsgSHpRJnojpJvdeXNrTXLbCC1L/lzAgpRGvR23noEHl9iwYBCZyP3KrWj3IEKS4fc2BJP59B2ndR82cZk3JvHKJpbnM+IBMdIlsd8cKzGRl27tU5EABKO8lvu5UIXfL+swPKErsMA1cwyycBcnuEE6k9QzVqkCgEdZX7vxuV1qk3KbU2msfZtPyvGdLoIguwe78UDe5z7Z0qe0hC7FvkFSq6pAkuv+HZK0CBcebYBSYyB0OCPJNSKrahkXcXMAsfBGS43wUcicTjZgkD8qYdaVEwciOXO9zUEy+QKpUpJI7maMv5KnPnLfZjYmYUn4GB2Rnic+MvnLnP8Iy7UU8Ak0zs2QOFDMgyOR2TnIHyAYFEs0aGJHkB1V23wBpXtOf3O2M5H5HiLAWIIOuxDax7MFszryEkLjHTO7g25Harembqek9ohkLPmAF6hC+2juGcgcUcah+pboSwEQOz4CB3DeIIYvTVe7WFzl79HVfpghPBBHp5Lzkjsi77nkDyeufhF8aggzqfprHNG7nDVECyVbu9QAhX0qMUrRJvxxV9w7WzTGTO5w9YBIJkGGVZHf7CjCDSxFSNUu5g48cw2fMwezFJEJLACzk3hIItGC+codw2yoQ6Ot7X434vOQO8MiTJ2xMOPXtvdLxWcv4n97tjOR+GsIiAn4JAVEdyoc6BIdGKeSuLowugwxny+QeAex4wiJumMqdvK0KX4Ek1y5MwHR3xEbub8RKyHnLHUoVgcAkzDB99gi+np/ck8QJj8CgILVNYIJxxgXu/Ny7yegh97ydIPctsg23xU1mlXweSmARSwzljiJUcodTYjd7DphxJi5ocfmYyp287WBZZYm76wsCNnKfEHe+z13uMPaQ0l8NGEE+XfAD6SV3yrYqTUOF0x/oNgQVeDYYn6rH9wyxdYm13KOE7OfaAxLi93e2PBCRj4spxE7usBWikjs6pz1Clr4UybTOVO7kjvwWDiR4chHbIviAkdxPBDHWoc5y3wBZ0DvpiY4BO3JBwrmx85M71yPlXQPuY/oD1A2q2WnESbu9b/38uZ2V3BHhuTVllKU+x5LCBHtO2AvKUO6+Zyq5w52D4KwzYIe405jpia3c0ZVDRUd+tIwJXEaBkdzRsSCmsTb/5A7ZBuvNVfKdxiq5+ckdXklSHIJxGTaUq5gDSTY8NLndcPu72MgdLglyvwYC4k6Cl0pFKDaQ646h3GHVRCX3dYKzbE5gRz0k/j1kK3dYJ70QP1Xxj3GoDqzkntwlro8aQO65E0HMBjDkQ7wKEpuj3IG0IeAFjIvi7M73ctKDZIP/hdzOTO4JpW8V78VvUxEoIy+Wb+SIodyfAiS5U23PDeWBHRfb4pJDxnJHNuXHraBD0q7ZyBEzueeaxMUAA8gdPnQu44FH8cSr85R77xOVyxBeW0gzyrEtcOffDJfbmck9hZXVwBxZCPXUShEbKBFlKPctO5XckZsw9yKwIy+ed4Sx3GGHMIeOVGsccg9QZnIvkeSeNoTcu4KYHjCC/AGNzXnKfUMQ0zZgZ8i/QS8NjSfgxnZp1mSMdgbhr+zda1saORTA8WRgKqAWuSpSbgKiVRRBBIp4gyqKqHjtVtu6yff/Dlu1fdbdc6DDGDSB+b9WFH2eX9N4JhGI+0eDdzGta8ApSowGFXX5BeLuR/CZNPl4bpKIq/gJTviLxn2aGx5QPdU4LEIHjXtUBtyjgx4NhGI7vr4l7jPIJ8q4Rn0W/aCzP9WO9rC9obO+u5dvT0Yc7occ9pnAvgNC+mBwi4PWBeLuc5rDvaNh35e4YnAW8lA07jnj55NF8IMqxeFekhf3NIOtEYElGCjxdrjjw5B3kg38/T/7iYOBDP91Pnyvm7osXcYE4e7mMDfiJ9i+qfqI4dYDcNJdAtxzr4/7BRWMu9fwsZ7UiR5EMxq4EwTJVftgcS+8He74M/i7kuNO0le9fa6fk641zZxR05B09F8Q7hEMdyhQ8h1Y3lNiuE24PxGRAPfF9xzkHSzuH+2CcS9rRnHfRD4ykCMCcW9m0Ave3n7O/WeIdZnwEOMezyiIO0nf9RJa73WVRsvEEGRb0uN2Boq7gUXu+y1iPL8HKicp7uuK4Z4MGMV9bJyDnDGRuKdR3KNS4N4eNdxXVcSdNG+76+44oz0mKZkJ26V9qut1t2WWAQvd6TGyqcOr1ML9VXGnhxwWISJxD6O4f5UC94yFuwq4P50DhHdXIl2bCbK+O5bmbo5B4T5vDHdw9KInRoy3AmFx+oYad2rzz65vvZMI9+IGh3nF4r7KYMGhx52W4tGZKwt3UbrrDEtv9Ph1Reus7+oSP7ArCPcLY+s5Fxz76Cc3pKsybLhTn3/We7SV/34453Rp2vjPuES4zzo5yFkUijtFcU8MIe72n54nCjets/tMdkp/zMJdUAdthrX6rcenrLG+06+lvJlqoHPu+ChkDHzM9At39lOzw4R7zDu2PL/gcYb+a7RMuC8GsGPShOJOMNzrQ4Y7jX9p/bhrZIJT//Xcwl1U39q6sTux4WLfeFNXMg/9D+4J1fGagYG7HDGSrTiR9O4tzUMdXOtDgTuNVbyd+Z2ApvGnpMW9w2E1Khb3BjqaPCy427e/zVztBqccv5fpFu6DKRHs6+7q5iXrvzOpfxaCcPcYesIRPoVU/pN6xXIuHzmc3HHh7IW8Q4B7ZS+y8OnXi8iOe4SD3m8RsbjvSnrkrwDcw4nWbSP4W3UL94FWqP9/hXBOSbfSZw7Wb7rkP4oBHvnbgec6gg/y4y+3EvNvJnPT7kmnK/Re490LnaqNO/WXlzxP/3CpgftHjvzvSTDu6BLqRnncw/HC39njR9gt3AcfvAXW0TJ0p6DxJH0wVTDuvpShUwXdYOvGBpfqydOxZfdC1QWcwgrklMY9WZt7/GR1cPdg5xsLxv2MIbUUxz09c/u0CWzh/mqFWw72b46T7t84vamzvstKbrsg3CdcCO5gx4Tug4+x/V6q+4oTldN8ZH/nnSug8ceGHHcaOzp8WLOrhXuKg6orgnFvSXlB9ktwt8dvVh9WkRbur1v49pnuvS7BKwRN2J4gkicG93IIcRccJmWbBLsqtoel+lGn5t5/vlQfBdxj+cefhmK4U/RCE8G43zCkS6ruyj16ktUZs3B/veA91/pf2z1+QW3Wd1MFiYcgReJ+hNgQigHPNsDKPXJRdaZCGjdbQNE9d9/WnMYVxD3GYfOicS8wpIZd0ZU73T4J6oxZuL9JzTX21FqcdO1glfXd8QcifWJwH0OkSkEZ5rjoQkcq4k4XFzjnKuLu57DPonE/YEjZsJq4N6+zjDEL97cq2v7j8RXNv3TWb44TmQfcheL+mcPm4KPrHv6ChmcU0lZz8SHCvSYa95KDwfS0ktsyB/dTzML9lYNnCgR7vNvSnW7iVj2iQEJwtx0a+t+6/8W4D8VDTMmFca4q7pXXwL2ZZUhRBXEPfwkyZuH+tt0cM/2ckq6ZGnCX9AR38bjjp0ktQdyrXGiac2G5qBzuySo3nBb65JlcCMiD+yaHTYvGPb3GkM4V3JZp1Q1R8ZgjmFn7a83CXXw39R4HwIRNDbjLeGPqgHDfdHJYblAr90BqZ+Mi0ln0U0KIcue5n6Z4z8ZD73Y8C+781pF39ukd+iQ68vdVcA9fMqQfyq3c0yd/cMMRzGYa9ycfCjNfD9LWkb+Dis70+I7P60N0O8cgcF/XOEgrD2DP3TU3v7R3VK7EnlxXEPfNT7xHgbnI3mK5Ulwhv5INd/HbMlhXDKkRVg336ynWo+xu60viW7xpnef+FsGfjPGy0t7OMQjc8xzmrBBkFNJUmstZnZyvbSVjK3b6i3VFcd/0dH2Tqf3ppM1OyWOy4u7nsGXhuJ87GCx7oBjuBZ11aSpz+yUeptZlHW+eqQF3iU9wHwDuF9iLFKFSk7zfQjv7kemtxVn/v5qpjDu96Ea7J19+eoty4x4TPgqJlagzWL2gFu7RLMM7vjzftm5ikqJ4Wzcx4C79w0sicbenOMwN/VlZ4MbSAilndSGSX6zEfL8Xs8OAu31a41gud9JGCVEA9xXsNy0c93gbvddYKdyba6gbeuZ6O2xdsydHpXvWf1Kf4C4ad1wGLU9A1ADu750b88tjufWJZ9/D0OC+nuJI2kfvg9VK4E447EI47vYGQ9oNq4R7i2EFr7atO1RlqXlpZsBdoXcvAvdpzeDTRe7upodSTs/h8t76RDH2axE7fLjTfY70bsyn0AXZyMdtCMednDCk422FcEc3ZfS1qN26IFuW7Fes/+7VGIIUhrtvHyMLE2uJw8Zd1X13rXM0+2wCZkhxn+VIHi8hCuHu5KCqXTjuBYZ1rg7udnQK8qxEiIW7JNmvp1i/6atKPLwkEPdkisM+GrujTVuerfh9K+SxIcedujlsY5OSnymzLTPJQZ/8wnFv6gzpTh3cS0GE3rM0sXCXpi8mhiAzigy4i8N9jCONoQx2v65pBHCfdeIDo0qt3Oc5KFUWjnt4laHDkMrg/gG/b9PCXZoSWdZ3x6oMuAvDnW5wWAAlpcJB3yl5aBRw72jwLxN7VDHcv2Nn6gvHHd90d1yrgjv2F+Fsk1i4S5OZAfe6MgPuwnAvaxy2ECPGrnq4ePpaI4A7PeSgeTtRDPcOB43nqXDcC1MMqdFUBPeDLPboi4W7NG03WN85rtUZghSEu93NkZYpwarCfYkYeWgEcLchtpXJz5Tac19EPtBtE457PMOQHFFFcEf2cxslC3dp2jZ1gjtRrRfjXk4ZPYkXn4XcJA+NAO5+5NXtRLWVO3Y2zk5ROO7klmFdUjVwh0N2+g2xcJemWxMD7ndNolovxn2ZI1Vthr9ahzw0ArjnOKhGlVu5xyY5SNsUj3uBYQWjSuAevoOvH7dwl6X0mQnbd1XbkxGAe0XjSHmC5w11Wb2OAO41+JfII6Lcyh19EK0mHndax5fuaRVwb8Jj2bPEwl2WPhyzvls9IOqF4/7CHfdQheBVql3wGQHcI/DvDUkFcR8b56A5Khx3cttlGE0F3EtZOKNv4S5J1MyAe1tF21+Key7EkeZtBI/CMWlt+kGGEcAdvvWdClFuW4ZMaBzkKovHPVFn+MCMArhvw9f/YeEuSWYG3IMzRMVehrvNw3lfg88dqM9cjBAyAri7oWx+BVfu2AEE2hIVjnupwbAcLaoA7tCPEwt3OToIjsCAuwjc7Z851kb3z/dDCMdPCSEjgPtnBHcFV+4E+53v+IXjTm50hlVPyI97qQ0PirVwl6K4qQF3omYvwZ2eujhWjnSvin+5EcB9Cc4UTai4cj/VOKwjHvd0lqGtleTHHZJ4ZuH+D3v32pU4DgZw/ElpFxC5F7mJKIusDnJRBxFvKKKgCKMjeEPHMfn+32Ed1rOXSVtoqdPGze+Fr5RDgfM3pjGxg/aRkQXuDC6UmTruNTdRkgkDRet+nO8K/R/ivkHfUE2wGPfZXULbqZged1A5ll7qt+0e93aT31C1peVnrN8Ls9c7RdxlL1HiayBQt+cmijcWP37cr+j7kCEWp2XQiYdQhH1ketxbXazINbB93O/ppXQ87tZLDgzs8nvP0g7uZsU9nROIkq00aCj6Ce2s+D+I+xf6boOTxZG74veS37ZNjzsaSFhR4CZpftxvTIx7sk8/5zaPu+XmXVi3dSYXQU4Z94qfKBJW9adQ2Hd8/LjXCOWave0HfvASBVthc+JOLzqhBXrI1iN3pe0H7njcrbY5h3WbewJ2GY27/Ekgiq6LoKmYIbRIA334uDvob/PJTMb9QCA04cRhdtyhI6ne46raeeSuNER8TPK4W2vJQNsLbC5wnyruYihIKBP+1+UXn+LSePGjx70YJJQTxN6cO0B6hSgQ8si0uNNr3enTSGGcasuykXvsmF7CGeNxt1SrhHWT7hAwzFDcHd+yRIUTAWWSNGTLCHRA7MUdpQglG2Ix7qjhIwoiTlF/3A0fhdYdM/EuLjW/t60aude7mNJEPO4WWlzHugVYXeBuPO7hxiFRcwrjnUeIAs+JDJNCs84Qc3GHskAouzKDcQdxiygR/GmT4w4vWN36pnplqrHvEnYtWXbM3ndMGyR53C2TfDSwE+Qli1c6Vdy3r31Ezc4kJSleK6chuA2TqeSDwil7cU+4Ce0szWDcoSwQJZ7rPZPj3upidRdHMVH5p26ao3mRF1udoXoxz+NulXbfyA7uwDilEGadNVGlywmnl6iLh2ASsztEkc+fQDCGWPvyaRRTmbm4g58o8NYYjHvxRCCKIk7ZrLjTs9c0qXt591QV4W/J+sLdsCBJeOR40aq4V+cwTeos87hbY+DS3/ZmHRjnJAqEw7ONVVlhMuTaTTT4ojAR5PQRZTtr2qmTD3KHb1nZZy/uIaIkE0LMxR3kQ6JMyJwjUJaeMRB3NMDaXIXm42Vn/uvd3d3XzvP39TmJmki3IO7iECsIDKs87hYQ5wNYtxLzbQcnUeYRfFmvf22jcb46cpA/2/UJRIsQLcJkxBxR4YlknNsynS6Unt0+SP37GQRl5uKOMkRJxJ9wgAZ5x35xh1CEqBAONxKVnwKPKonG2QwxEHdYfpbwONIrl8v1+pU6uNSCuGusu5MKN4sINGzyuFOsWeBeeABVbRGY4CSm8TtgUrNBoi4ezOXL2zKCESQnVht5/8ruTzXxlZmLO5TjRFH27CANypDcuPbZMO7FvEBUZb0p55dtWRxlfe9zOZrzZj1ESdDMg+ppgZgFq2VGxBesSCr1lhCoWOis87ibb+HY3B3cq/0hGy+BOXGnl0poQ9s7RIvHF4nPuHe3gjvZmXjEJyiV4ZPIXNwdfqLCN5NrJGYrDhHBD6gYTsu138+jud24QIgN4z66Fg3Cj3dwJ+Oeif94/4ia4CSB+UPCRj1aNXKHutpoUQr80Yu16u0kghFxuV2ttxZue0eFCwnzuJvuqYR1C9yCKtSTXAMmNoo0Le5U27V9iZAp+WTm4g6zvxF1kR3vmT/1LeqMnqRyn1aC7rfHtWfcobJFpheECTx0sVHHi1bFHW4CWJV0XDrqv/QGnZtB7+XxqFmae8s6j7vp2iVJf9s76vEWOwGMA/PAAJPi7kulQRfknCFTirIXdziIkHEEQSBvbB13SGTeK+50jCVsjDSwLO7Lw/HPzuWS8Bse9/dRfcS6ST0RVN1e4FcXm2B/TnPanneATojqnF7BCntxd+QFMh4bcYfZzC+KOyz9gQ1ar1sVd6hO9KR53N9V8tKFNeg/MeBhDo8UlsD2TIn7zIYDdEONLJlKpMxe3MHhFz5M3KF2+oviDi2j8+6uO8viDgslHneLJTtYv6MqqFro4jcF++8FbELcPcEQGLLqJlPJFdmLO4RTwoeJO4TPhF8Td6gPDdb93rq4Q6vE424pdHuM9ZK6GtWu/jOBL90vgs1NH3fhRAaDtlc8ZArxCoNxh3De92HiDuGo79fEHdqDC2xEYNG6uMPTvcTjbqHNANatu6DR9v8cwXpv9xdi6rhvnSMwrJiKkylEWYw7oAP3h4k7wPmueXHXFisZKaXUszDusDwM8Lhb5qE71b9G0IYu/C+S3U/OPvCQacysyTANx3mQGOcVWYw7oO0VgUwlh2wTd1TLCcSwLdChdWmklM2qhXGH5ds5PBUpxuNuUMtA24+/ah3BSp0ZY+/t3lEoN0OMcp/IMK1iY9dDjBCC+2kmR+6vROeh8SL6vA0RbBP30e8qHzHCs7sfBl1a/WOsz/Fjy7qR+0h9aDzv0lx/AXjcjaneY/06SVA1f0EN8+/A3oqh6I7H2Kg9IYIJalG3gTCcNmTE4GqZN6i2kSWGzPjLaQA7xR0g3cgQ/VacNQQ6JTebkp44HsWSYHHcIbnUDxhL+x+DhyTwuBtT/S5hvVyXoG7TpTjQtzmE9ta8WYHokd3aCCMwB3IcrMSJDtnM/ixib1fI/0DhsndGb9iD/lUHArBb3AHE0FnWo+vjE60hMALF7ucmbGOhv4AALI/7q3qvpLPvUuF+0EIAwONuDHo2soN7FVQ9FLCCwgLYX/iz8/o3D5mMsBINhcFM4dVvh54Ju/Ap+jnM4BmqNEdoTceUVPw0v1pBAGDHuI/+ANzyTfoObnwOg2HLS70uHivQvHlCAPaIO0D96/BYx2q8/u1ozM7jblTS0A7ubVDVKmBFXRbqDqgYrl35g+4ZgWjwxN2nDdmBwGzIkUht/RYh6nzZHW/qYDZcRKCtnKEVJ2jtWYaSmiSM3gwlMfFF73t3ZgSiRYi7g2fRBH3dtIOtzM+uZ2ECtZUM5Ur3O1i5uj6c8RA1nkh2J3i98Tt1JXqh5aXL0pwLK5MuCs1erKoRx9b39Z81N2ES/XXKMAkTEaux4fpobzANgblu8/muvizCWAvrk1/E0/06ZaIoVYfrFLuvEaF29plU6QlU1e9Vj2pnZ9/3Ym31Kp/6tOWOE4rgPk05v9QQvJdiory2spsV6K67V/z7jc+yvW9OG4Pk0NU3/6nCZXvi7swnf/7qfM8BrJBDG/6MO/5z4YVs8Ppko/x5tggmaT/c9u4LEnUHsjnsbC7adb/t5NNmp/fY7NKJl+a694+Xna9L9Y/4Gf/V0N0F1q2wYGgCXzqqAkOQ6AhX5Nnt8kZ+LeXPnZ2d5VJrGwfbciUswjtD4XRF3ls9cO6v+XP+1Ek+2vjyeU+uhIsf+UOPij8uO1F2jl7w0XW/llCW02EHc9eNin99eBob+dTrpZys7V+d78mVtEMEk6Hl6mLspvf8+PjYH172OrebD4vVtt3HlWKyXa3Xl752Br3nYb//8vrE5zef6tXqctKuv5OYEytg3Y43tXaoGbMVDcdxHGc+enMv3S7mRY0J/ADW4Hph4S4Ex3Ec45a6WDfXANTdBsb8cI/XneM47p0tFgwsgnzWyHNsDo8RGPAZNY7jOFOYutFyX6PtSwU8lqtj91s9HMdxTKuXDIzbm4taD4gncHEDHMdx3HtprWP9Si2Ntk+434U0z8fuHMdx76S+LmHdjpdA3eOkD3jBxJnZHMdxDDJ09NXcJqhavpTwxPjYneM4bsQO43Z8K47bxYCP3TmO43Sww7g90EEauxhI+A2fd+c4jrNGy9C4/aVteBEk7aLD17tz3J/s3W1P2lAUB/BzkVbWddpZQBcCAmNu4vAJDaIDjIBKBFzwgaEzmtvv/x0GzBdbRGyPZN7O/+81SRso/zbn9p4DMFGJFiPbtd648eZRxkZX7FUFAJigVEsy1JITHtNn+aIhMgCAP4hUVDLkkvS44IUmvQvdokckAMCEdHKsbE/ROLFzVrqf+6q/OwCAsmLdqmSo5gWNVbmTDFrPP7OZAADUFWxbksG6pKcU1ljpvuGLuaoAAEo7bockQ8jN0meCl+7+mJoNAKCwyp3GCuDbILmQiEqOXJcAAIAvUeNl+12BXOlUJUf1Ei+8AwBwxZjZK3sFcqljSd7dA8uqAAA8sYumZGkdkVviQpMsPRTeAQA4bnqSZ+2G3IudWJKl2UFpBgDAsx8tTbJEr8iLT98lT/Mau1UBALxJ3lqSp5Ui8pjuIcmifV4QBAAArl3VNMnTXCCvCueSKXqCRmIAAG4V2lXJlMtzjvdTkzyh2hV6vIPSVm17lQCUkK9pksnKM7dKSa7qyWuqvIuwObAtaJSgORAm1YTNsRbpfyXM9ZX40tnZUrx0qtbPYi/Px+Px+uYWqcl+LZfIv5VsNzV20naJp9JjHzO0kYrRC5raHgTqoqDHiMVw8ZsZtmkCgqWM0be3QyOIFaMvM02qOTTGqvtq5cTc13X9fdhNspffGZG3zlAgYjRObfJsWu/7ShM2Vd6LBIan1SA1bWaMP2V0PVvasn11oajnuNvSJJfVEcSU7Em25vURvZSP8420nsnsf6mvT9EoYq7+7o0xk9nPThfp+cxdZ+CMRtgxnL60Wo+IA2lnrFlfVdaKEcdxDJOeYh/sOn8LNLYEeVQafkE0WaI+49zLkppWnIcCh+tId75YqmZJtualILbKhia5tNwL1WaK9UzAuRdJl1dHfGLWcO4F9AObnq38+4lrmR6wG8PTOFXvD/Aaw93MzjgP6HNCgXAX5Yjjx3B3nA8lm+AXe2fDnbQVBuB7EwpNAqQhQQTFVGCMryIiIFCglRYqVIeMbWrduq33//+H3byEkpugpCW29LjnnJ3jYkhyv577fb0V+OLL3tUGbv8IhfTO2+7Ay493r3ecZ9tm3KCObCTabNNNR5vCj8hX2ud9bi6C7eMHlHtCWdT5h0pOOYxLC7tvgdz1HDHI5AqFQgxtJ0WyEmmA/ucWPHn226OdTdz+FKONOHqxyev37lzvOC8QQOI4aS7vrM9RxM0bONNjPNqUtACvimHEUofrxx20fcRkCyKhtGULPYzuAswH83cldz0EOSLc6KeDmq4F0z2FIwY5/f7lnvDDQzt1VVV5tJ2A3OPFgEk3K3AELo09yw31/I/SDXj76Z/dq004+RWjDdl/s3O1Ce/Pz9Ad0vITA7EQ6/eLhTgxqDKRUG6A2g8HvUkgmwEndzcX2RS8EW8hhnLSuBzuoW2ncT/9CzVSbHCNO5I7LhIDwTJE5puG4Vrv/uWel4xWwPZNzTjk7rfEsm/SAL2H6sgDfOlqIX4YRD8CPz09fXe1Ee8+Mta683F3YOf9hzOM7ghcIgbHNR7c0ROgRZpAFnqS4fZRx/gmPgI3iNrmmgqtGsyoiYQy3NaW2L3LvWdUrncl91Yb3DTGjPA5SKH7l/uYUGbb3Wxl5A7g4CGhcBXkAZoiEfIA5I5fb9pov/jl0dVGwN4lLziC3UybsPvPp6MN/f7E3fBOx8/avBYllJLl5fPcOFKZ8RQZo02pQScgyoxmlFNQGrZxUGY75B7g7k7uuAoer9qEMk8i7d7lHoNsud3NAJvcgbF3k0rBDHkQcj86/ffjxRN0W87OT0HtG3HyCXkB7GbalL0XXx7fPjr2P52/OXfl336YlXk5Syipsm1hi5hYFnmoDVpoU/AlgVep9tlUrvsApiZ/ALmXk8SgjhiwTChiczvknn14ctegsST8SHLf373a2dl9/+X3Xx8/O3t9E629fvbpA6xq35SfL7wb+4dTxDZkZ+/Ppxf7NxAdfrv/1/NXf3z4fLJD4+NfN3L3zQtw0OJyw/acuryjQCiD5WeUReOGKkabUlaIQRfbVuXktrvA/jByV3OgcWSjN8zlcqPE/3K/odzZhWLhH0rue9dKe/T+9M2X358+PvvJxVjMx79PD8DsG3Nwgbzj7d/efNTJi9/OHx+td/TR80/nH/78/OLgxHyvS7mXZWKA7aMlHbRAj9pn97NelapKnFCEpSfgY6IR9AB4qHJX3ctdb3y1ibkNm5gerNyh/HD8jyh3E9qM3917d/Dz5y/nTz89fn7x7Gzf4PXbt29fvz46Onv2/OMv/7zf26VtVG84/Qt5yU+/Q4A8YGd37+T07z9eXZztHx29fk3Df7RPOfvr2cXzVx//+PDPy4NHe3u7TEy4ljtfalBCaEnTTyg1dt5KqVudLNEr7TpygFv5fL7G32CLIWEKaMR4MFf0rdoDHynKiqKE5GmTXxmOdCyrZMLhdi5ZaWH7rzvpdDqhwrE1tXG1qlmrxdbYeHIj2520yt7IXUtTtPmfxtNqE7PXLfAJeqUD4WWu9gazlJJLxiJBbF0oQ2M3acj9OG+QwLZfVZIFGkWF0gQiYEXq9AtCOBzOzPoadi93orpLy04v2aCPF1OjfoJ3K3etFpNTipKT+81Vryl3KqVsSknJ3XzLGkutNCUJvbxamtJhU05P9JMzGhWzQaXDr1BimlKHI46a40A1YYvGgNygGQ2ykRM13ZdzipIadfPaLeWuFqDlzjwda+PSUImG44ezWE13vBSyCYaQRXrVCoTJyA39uFH79vOU5nX8YIgR3nhovijLcpJJDzYwU3lI40mORTR7YH2dNKVs3NWKVKoB3Uu5s+y+e3Tw8wvK6Zs3nz+fvnzxHlqo3rFzuo88Bf5tJk95d/Di5enpZxoBL19Q3h+c7DnjgJX7bYiIrNyLjnMCmhkjcwZXjvFAQ9w1uh/y+RgB9RzUIxpyoMYOw8REzEaQg/RIJAu4dlezOSIliqJA39KUD8PsSoVgss0tfnecTHgi94FI6VJzFVPGVyUXxa4kUkpMTB7TK0odMTSz/uugHMbqy4SJE4YhUykkZD/HRIAdvtsmC5Q+diF3fkYMAsgF9aIgERMpk21iN3LXA6nrZI3PKshOJylIKxNnJlKicF00aLSYkzKGGbJAkBMY2ciKlCnCnYFipE+RicaRfxGKdrHu3BMyW+7UTk3V2425HxNKhik4gRRHFsSHPR9iGAv0g1NlxPdz/uvlMWHCcKghE16kKAmkVhXzof5RDTnB42VgwkpAtS/EoU/xt5AvMoMSkthwzP0e2flyhLzG9/HR1X3y963kjgOQI5alZUgoMTbdCWXigdxRL7rsF+CY8eZw3vlJkWOOWBCrvO2GqZ9Y4Y5rmJG7UZyiFbUrEnYZmq+XkcgSCZ68sdyhSTnAEzATyN1yPclUpHHHwhP4yCWcUPG5kDsfi0rWX7XtdkWJhjUOw9PEermjKgca6q2PlCZ4ZEm8yq+VO+60mR+Fi6xf+H6GMInTLyOTEGFpdyzV9SzOfsqARwCbo6u+viFKVu58NcNkI1ss1pOMUblQC99C7nnOfmCCNmNjLyyz1UrFSCuBD+bgtrVyh3c2O3C3iRgrIxuaHGUCk+uw3Ru/cbGjJo27HrTcd788Qd+BVzez+1bInc9BgeavZQMmr7D7FqF0eCF3Nbvcp6qJYICyw+0VgRhElUYqQ+D+S8SQD8PVhlxMFkTi3OHqG4LcqatYueOeaftMRjQ351Y9kHtXMuQegW+9sdwH3Lx8ZzKmo8QJXit3bFpHTDWU+Z+ECGIIKmZXoNEAD8e7LuTe8ZuuyeM17XZl3tbNlkrZeUUc7uM1csfj9vzpxzRZJfhTkvlNLLpInIyp6T5eK3ecbhDzZ4J5YJKU1BCDDM0VmPBh5c4XzWgUMmFz9wcTygIHz/M3Gma11Ai6lzs7TS1NLUVOnleihUEx24AXS2xUjWH0pQU/dCv3PBtHUgDb3D6UiIGQug6M5tgpzjUHhDxwue/9/hP6Ljx/cXUDtkLuNUhpGbOdyCZTLGfQNPVC7kjLQFZMwNSuw8pA2g9d/UCnrutapQFqGmNHZaPk9TL2qa1LyPVZp9yL4uIMhYr1yVx7mtC0YDoJfy12Npc79EDkeeGib7uJ3HElCtVUL0g/KS9DUFJ1BGixy8vLnGRo4NKgh9kF6VxqHNT1eieWgcKus14Ce45qdXpHoktfK0rr5Y4XRTuuXNY0FX99JyskSkzjMebrkzYkZHCN3IN+MFo3YSTruAEhsJ4Wl4BVW8q0o2labRCFmxcx1b+khOA1g0tKQGc3ZUiHxQT9WeJSWHWcRgnSQVmkT3EZjfDKkBH5nYEImYq3OhiaGMOaRj84nYwb75nhG8odd7IcJE/Lkgs4+EgawZjXa5DC4QiyT4MJl5L5wXO5d2m4k1BDJyEKeEbuGfqYaCNWqQTMTefi2NaqkozAZCNGYJpyFCpB3pqmbWh1LcrMg5X7yTn6XpzdZLPqNsh9Lsp43ja/Cn5hl8vMPJE7mo8CjTCet6R6X9nJGlpIV4UilrN+0MT4ZXRxgw9ME+Udcm9LhDuUu4FALG0Nx1BbtCTBqzGP5J6SCPFnB4FAtYLdy13PwT3qwomGbaT8utUy0EmQuur1SD6hdBm5wojXdd88AmZzc7YMWSAJs24liL+yURLez35OxSl35+GfofTiTQOzTcrut5jVF4OFkDum6zYx8aO5zRfZI52C/+9hu9whfYRsieaGMTOXxJmKwxURGryWsb8w7LnjkeXvScSF3DM1zSTdKwnEgAtgW3EaqUwvKIntcs+I9O25ZJXmKP2bq2X4eXoRYZ7xcCQHF2ZMTEE95r+Oz4BohI3xfxsqSfpfKknLTEl7kHLfOXjsQ9+N/d/c230L5I5BTCSr2uTOFqGSh3LXC/MTfnXlK+cO9MPQDmQHGMIT+wko2eUNUH4SdrkTiWZmDfSGTb8I0EZiOyRZnzdy50i01OExvM293GvzDvi1NeEtxTVyBw9KMr8c8OBsE9MqdAEsd3REV3JHrSFHlkSFRrepY2SnGWa2tfFZR0Cdcocuir+1/MQUDOagBQkBxnzZ0UJ5zVJIDJlFSurLgEK2UoKO7MuReLHFI0v64AI8UGe6LTl1OfTEbu/AEKZCeb3cOb9gkokSQLLWSTq0kSPLJIZaT7fLXSLSsKabGWq93IkQwYsvhxoubr1N9cPEC0YmvhIHTSxG7vDSw57mg3c+RLnvMEsgvQf/4vq4my2Q+zgOZV6zX+GdWXbojdxRAjyTAvMJaaf8c3aXVzl22KWcFCl9m3crDrmTTAQ73xxfyrwKpVn3Qu5sH8C93CfsJ2DQ5GCN3DucrYj7IM56iA2Z0GGe40rusMaGRblM++y5RqTIPBsBs2/KvTyyt1/7HFO5jyFqdNbIuTVyrzfsYykoEmadDI8y4PqIpQat12WMJDgjzzSRSQ9crlpyZgYmLm9x5C83qlsr0ENjXYpvmZwQBo2Vu8FQRyZuWu4Vexke25N/hm3Do3GNlbu1ofEQ5b7z5xH6vjz51a3d71/uCejQRwNsC2u13A83lDs7/8iBbGLOT05H7ce+p0Wj0C3vxFqaYil10DXvOeV+aXt6PsqW5laVMil7JPdc/RZy7xNKw7L8sUqprZE7mLOIrXexR0qoIcdxQEHFndyRr0WXoXLEij9pWxWtpymWIZup/SOdcq9Df8xqjoQANmeEJNaXgqtSKmvkDl2WMHMXD2mfKjvkPuNtAR1IbPVRbzOLt4YwFW/f/yf1bix3SSzWHZsdEpakgX5Qxy53qEfcyz2lMsNm7Io3dWa3PRraY65t1oAPV+7vzp+g785z5oR3T/F2nXsQjCWVeDdyb3sl93qOmKQwcjCdryu0Zl7osH9DS9nVcg9rq/oMHISWwRO5h/voFnIfz0sUvskOVQzqZvo8EyPRQjwrhzzzo6Q7uQO1WOE4Siy0v718BmYvct+Ue8Ux6602mJ3R+TgIqXyjHarJZceHrWm4ul3u0crK+YW+dXlplnI9KSDYZ3JQlcma7uTO+UNdDX0Tzb9a7ll8A7lLVcxUcOzoXqdtvEKzx6ZUsstd0R6u3B/9uonbvT/h/X5b7uqQmIXDjdwbHskdyjEzoc8gOxcowhjlinuxyVfknlLt4c1AKZc7GHsvd7FzG7k3xfkSEg1j13KvQzH0OTaiCep1GkJtw/YkepxLuQN8K1KdxSUCMKMVqxIA5C5/U+5FULdz+XmF8Q+JD4IYu5c7TOwO8IrDRyd2uQvBVaKM1hALO2hz7Pw3wwq+tXIPD0dz5GJgnNYxWg020fxgbIfcp8il3J1118gm90jYUc779vqjPb/wUOW+8+YM3Q1Pzk+uPMZ7udezUHhDbGU9WTXm7t2EKnBJDKQiRk5S0LqOWFFWnIeNg5OqXGgLlLa4Wu6yoxgOFptVBr207rHc/eg2ctdnBJBCpUmCdyd30A4XsRLIGALWmam/Nlu3MZuY3IHTlw3IDSubdHokMCikIAHa3Fq5QzPZmaykyhw+CSvzk72mjl3JXRPZ+RlAh+cO7HJXkI0IMy/hYAqDJRErsCo+5HOzFHItfK0yGIUEg8PwyglV0ryJ3P3Nb8l9CgV9ErEwsLfr2vMVUA9U7ruwK/VuwK8OrjzFe7n7ZA5yxX/cnWn3kkAUxmfAMsSlBCItstRMszhEYm6Zx8pTVof2fTmd+f7foX8XUrhDDVaS9bxqEWeT3wzDnee2sOs6D/dKDO5XtoLwk9L27z5JpeIEbqxEvsLv2qhFJcFjJ4lqBr4CUfFwt3JcudPtQdCh5Wh/H+6Rk0plpXu1KqeAew9i9mpRGSpsRcTiPkqy0BVSLK9nSWEsH/oPd1hgWwnhDsQt16JC5vHj2nYrY2j5shDu4T6bgRYXFEbKwnAvEaQlw6DkT+tK8V6GX639B+BO51faEtsoGe7en4O7ybjGlBPhvtyDcVgGOnbtDclStz8IZ6/s4c6v26f1pCNErIgOMUVvVfZjmbukOr5CklRgyepHr79XY1g9Du55wmkcPaKtlldr+Y/Bvbs73EG9qRqpklGp2iK4z8ssWRu4V5KMlGsI7ilFR6d4+thzmJ7Tw52eYkj8VaOSGh2cjm+L4A7bQQaO7yhBGDmGe2dHuH9ivP4Q3OkAqiiCu/y7cBcF8fBwl5x/E+5vL5JsdX+HrZnsX6jmOkFsXJUmrqoH/AFq82DgrllqeOJ82O1YVredHOeeJ7w8U2ERGRX9b8OdjvuxJheuar8Jd2g+D/fCTnDHUe2sMI76XhkMVJt2r1jW6pRwW8abMF6Yufqt47HBsbxfh3tJCHfzr8G9FzazPOmuKtaDkrR3uFdSw/0f3JY5dg2iZLIV/fg25QSW/crdqwAf22t8Tegt85RPtOZnB/favMpJR9YcUtMca7Kcozm5kx7uhGpOZRp5JJ4W/ybcQbSxvLIoqNug6EYKuDervHLfm/88Ae463pZJL/g6VsfTi2JVNVm2KbXzQrjbUwhNqXIao8HpLAqbwVGH+i/DvSKEez4F3CtVTiP6a3DHz8aFK2tPlu0ctce1PcEd90CV04z++3A/+eIj+Ru6/1qw85413PG63U+45Aq8+uLNXjY3t7uR2YQAB3ej1h+Au5BBPQNKbWx/yiK44+JHeWsKHYAMNrKEO97bzlcW35lm/hzujpFYHA577O685w6h5U91vn0I7t63mqrdVqSS6fbc60Qsr/q0ckplge4lwR2d7y2PklYnVoptGRR5jxqtovKRBHAXeedNevaG2PvfloGu+0QS9K9vy5y8e/Es+Uu6/fC0MCoy+22ZRrBuX4ySgxJwTABE1il66miZ3eGOKGD0foYuIHfU17UphjtWrlF0m4E3XytDuPeMLdyx7EbdVNTgyV8cLaOIktXiaBm/LIT7XPomn2C5CO55CRmVuWK4wxil7Gq7MXOnEhfMwsO9WAAjGXR+FzbeXCHc51xqWD5aprMHuAdhS1VCMoC7OEL/3165H7v75hL5i/r4RHBgNXu4yx0pwnasEcPEvho4NmUD9+foJD2nMdg96ehl3S5wj1mSqcsM4T5nCO5IxcAVZIDhztPLID/REowGGyj6Qwh3ByD+NJlYhXE8p0e02z6pQrhX0FeLpEMhhvNTuNuTEFq8o8ZICPeWhI5P0EbxSFrsXNge4O5CbezIZL1/uK/BfUD7z+B+4vLrm+Tv6uz5F4IsUhlvy3gVKfB1ocnMK6BDkzmgqUuzgbvJ3a+a2+/3bzViR6AmUdor6eBO9fGRvMgaCjBg7hHu+N/vYbiPv0lD52SM9U/hzk9mZNY/0jwXT67lI/tEIdxbLEJBHFu40ONOBq0IY1MYhy05QwTtaf9I+o8GZ4YCMDHcQVBwU+cfW2qaEO5FBRHQvtc+Un7rUIxPqA76R+r97p77A+xDlN8/3FtwXayf1v0jrf9huB+7/vAmOQCdeSEInMkS7noQhzUdkWTRCoqSnocO7NnAvRc6HKJfpqTFnpcXaA86Ddy1KyhGTlf2C3cT0BN1CD+O4d5GJ0dmhhjuxMLzH3WhZXY8l0YHucgK4a4Hn9GTRoRZdvy0QB0fH8j/FO4zlfOWgcBqfeN9ho8mpIH7XOW8ZTwY1Oc5EdzDn8OCxlPISn50CpWWBM9h5u/CvYvgTqEeK3mfcPdK3/rax6/WJPdf3XM/dvLus9vkMHTp3WfB3ntmcNdXDK3bsfxabOk+C0mREdx1uKmeYlfIadwS2NCQUXialTtAcbG97cewwHX2Bvcei++uylcZhvupuDUvWX9rXK2K4N5E58wgYXmkwXY3jh1q4vudVpgY7nLQk+gVcwvqaDiI5Q5K1CiAuwzkjJLRKUdfDOQAcSVtyyModc7DnU8AObQJiTe95hAh3MOMJ/62oeWYT6mL3eA8Bc0kvwh39AxTLewI98V4Z7hT2Dgr2WgiL/dSwP1e50gV/aDg/ujFDXJIuvBy33ZiX2j6dTtKoJiwpDnu06j/ep3sFe44y8/xGbqB3fj7RPVWLoYWMdwBlPFEDi7wbrQ3uGtGzLi1cdXg4G4F/I87oysassE6riXEgzyX42vr9iDSwQZ8orHpkGU5jZ97kD9FqkToQaunGCpNHwJRN19eP86E2zLhMBUGcT93dpVuoRxDrf1pa0CL4Y7TEaj9rXG9X4hlwuDhjh/cmnrMOfGBHQOp9AnNmKf034V7MMSjTS26ux5iMno7w50UYcF2S95cc0+ChU4KuENdyrPDgfuxk+8vXiKHJXrh1eUTiO/Zw33NGJi35JFm+FUTK9zSZVlbl+DzVm7PcMf33DB8sqBeB61TGxOo3dKmEBmdLzBVAPe4k/zED66UnTbUQtsX3MPlsrSqarYta05JYpCqsx31c5eAGPUcgSqZBsakb0D36/aRtjmCDGCwHnbRYMElozWlyCeo7BaYIYY7uAkGuexGmnxUZ7lR7UAnsXYdPwFJlgfdaPemghOq0cMS0zAYnzaC1w8DtICd9MLBeRpAmibCHRu6l6/KwQftJaCoNiZiuIfRjmpXhxI9S4JULsgS2DA1ArLnUCOX/i7cnQDmRQqFjLvSrnBnpZls2zYVwx2/7THcsJ9y0BjVJenhfih77nfuvjqU/RikM++vIbxnvS3jME58jARke4OMMjUG6nokK7gDzwAeTqveqroLhsNn3LBOrr9efjrFWOFKWvuBe+GVpr/2891gCmuRvcGdtBQGaje7CwiAewr9WcRG28x4nvfXTr8ZoDX2wqEWfGC4Kll0m64keAQwq0ddtLYMwKKHIoHgE1edXtW/1WRMMtPYD4yn2yRMzVVTKbNASo/GDfahxL6zdtwVY1KpLIY7GZSDx4J5q14f5KcsTGqH2iSt3KOeMLsMJ7jl4Q6qB13cdAet1uhpVwo3ZcRwh85XYXSspe/0lTATO/6VqtN8tV5vOUGE2fD3o2W8ZtC2ytL38x2DsVPHwdM/Ddy9MBHsYrW64u0Ed30Y9FN+0JqN5g8kSA/V+Nfgfuz0k4sH8RY1UfTjueubhh8s3DVLxcnmM4S7Hc4tZUVRClLwoGGjuwNk1CR42ASSzFPAXd9eaYR/yNM9wp06Eouo7FYx3AFOYZWg1fjUsA1VBq1ysRdkkAZCUcL59zg6a+xdCcssFAyoeSON/QDtKYwT/+X9sFlSUOcSrLq7ArhTs7YZ1rYK1Y9bPE5wT9TyVJRDldB1UGO1rSjHpaCAuSyGO2gcdq5qQIkYd63IV5cDNtZ/H+7Ur30v1QgmziZKoI3hjmdA0FTfCe50NPnemEnYmFKRkH9pW+bk4xdncuTAdfvl9SA28mDhTsinAttI6hRJZnAHzSdqbG5Z2nFGX4kw0zCDNrlp4tyLD8osqqlP9+YtA+oNt4fpF2vKw53MurEJQCqh7hwcR3AHaVdrsauGY66P++0Ina9SAnCfCYfmQeyLAQdf2TnXprSBKAzvNmlj2kQoRGCo4dZCIZqooBIrEBuMiiAENALipf3/f6ILtTE3J6SlM9Lu85Wcs3nPbt5dhnA2006PiVsuelVM701z5zzM3U7vyCb1jQodk2OvxGHJs3GYuxncqr2AEQDmNHdA8G+tbX3qDu/gCrbUa4U0CG7ubs7fWJegHD0xnyI/cwfMfmBzN0MFuxg+Df6auSvNhZ/ZRX10+uKtfUo12z5eWbh8HQJ/SrQ3jlmVSmaLviMqCp4B1lFksQaCEg3RCB48B0xanOmT9hE42NswHw9aJQBHI8rW+Fn+htfIKmvpK7MR4NYLNOIeeNGftpUPeSvh+sLMP1b3y2gw+T2N4Oxi4kdPfWVyFAfskJHCmtvcgdS7tGwb1J7H0JHQYxHfhmQUOh36vew/N6XWms2CN3ZJtylumx0CVjUOAAHlZm0l8ayWtUfaGr/rGpraf2dq+kI5LVKlEZrb8vYalq8bR2UOAgdlGrEJvCBKJ6tmT5+S5Nrq1KJlE2sQwA+KRrCcX1dIcxt7JXwEMI5ictZFnmRphOdoNf6Ty9xphP1MoNEIyrX2D989idl2pi+ikC8l4GJ2L4cMCMRZQj8WF2VxK+LYWA5jf4SsDm4/d14vyNebF9+uMxDMASS9cQWTnKoJJzwlk9Anm/+4weOg9LHOC2wxFI8Q0ONjonfPsmxRO599ambzzw9JpqHxgsBrKiPB4LccXA2UpKRck0hoVt8VXlM1/qTF3/cYEnolqMklWWYccTDd00JFVtAoM8pVpVqD6jd2f+ok550rGI3EL1n2fQ6Vv3/wTJHI5PQatkBx8FfuOUoCiWR5Nq31SNRLKXmwjSpxyd+rByScv8wkU26xuRzbiidJGHB+oNQr8zy/eZ6G3ruzyqMqtzYbDJz78fK/jOkXUPUu6zVovz//LFBi5EhETkoW+XOufzh9ptG4BW3btQM+vz5MfwhI/magj5t/7uxb3wepD2DpUCrG8QLUX1y1ExmAwSwSGI2CpYIgAOZlQX44u1uf7IjNld964zF2saOPlPwyndlt5M+y7fFnsfNb6jvi53G3ouSXcF/DYDD/BzCTGHZvj8VwkN9Ox3p7dKMsra8/Ub2rrHdvt2JBXgna+jq5HqVe7mtBGAwG8wjMn1WVVKX9gE6ysVizE3b+4+f165VwpxkTL3Zuu8OUUl3e87qn+qpyWjEmSPxUu4f4cLiJxIs7V8Ywm1Gq+LyOwWCWDaic3iQqg/W2oU+uZkwe9G7XaK8PRolU5h93tepdtjIYXhtGV3/4/qj/oWtcD0eJ7F3mpf3vFoPB/Gi/jmkAAIEgCELyLq7Gv0UCEuiAGQdbLgcqY0mqt//0SrL7X3oUAAAAAAAAAAAAuMsE9e/UamSoqbAAAAAASUVORK5CYII=";

// Standard delivery roles (from DC Project Delivery Process)
const ROLE_OPTIONS = [
  "Project Manager",
  "Solution Architect",
  "Technical Architect",
  "Developer",
  "Business Analyst",
  "QA",
  "Account Executive",
  "Engagement Leader",
];

const MARGIN_FLOOR = 65;
const MARGIN_CEIL = 75;

let nextId = 4;

const startingRoles = [
  { id: 1, name: "Solution Architect", hours: 120, rate: 145 },
  { id: 2, name: "Business Analyst", hours: 200, rate: 110 },
  { id: 3, name: "Developer", hours: 160, rate: 125 },
];

function SummaryCell({ label, value }) {
  return (
    <div
      style={{
        padding: "16px 20px",
        borderRight: "1px solid #e0e0e0",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <div style={{ fontSize: 11, color: "#6b6b6b", fontWeight: 700, marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: DC_COLORS.charcoal }}>{value}</div>
    </div>
  );
}

function formatCurrency(value) {
  if (!Number.isFinite(value)) return "$0";
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function formatPercent(value) {
  if (!Number.isFinite(value)) return "0.0%";
  return `${value.toFixed(1)}%`;
}

function marginColor(pct) {
  if (pct >= MARGIN_CEIL) return DC_COLORS.teal;
  if (pct >= MARGIN_FLOOR) return "#B58900";
  return DC_COLORS.crimson;
}

export default function GrossMarginCalculator() {
  const [contractPrice, setContractPrice] = useState(150000);
  const [roles, setRoles] = useState(startingRoles);

  const totals = useMemo(() => {
    const totalHours = roles.reduce((sum, r) => sum + (Number(r.hours) || 0), 0);
    const totalCost = roles.reduce(
      (sum, r) => sum + (Number(r.hours) || 0) * (Number(r.rate) || 0),
      0
    );
    const price = Number(contractPrice) || 0;
    const grossMargin = price - totalCost;
    const marginPct = price > 0 ? (grossMargin / price) * 100 : 0;
    const blendedRate = totalHours > 0 ? totalCost / totalHours : 0;
    const effectiveBillRate = totalHours > 0 ? price / totalHours : 0;

    return { totalHours, totalCost, price, grossMargin, marginPct, blendedRate, effectiveBillRate };
  }, [contractPrice, roles]);

  function updateRole(id, field, value) {
    setRoles((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  }

  function addRole() {
    setRoles((prev) => [
      ...prev,
      { id: nextId++, name: ROLE_OPTIONS[0], hours: 0, rate: 0 },
    ]);
  }

  function removeRole(id) {
    setRoles((prev) => prev.filter((r) => r.id !== id));
  }

  const isHealthy = totals.marginPct >= MARGIN_FLOOR;
  const belowFloor = totals.marginPct < MARGIN_FLOOR;

  return (
    <div
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        maxWidth: 880,
        margin: "0 auto",
        padding: "24px",
        color: DC_COLORS.charcoal,
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: `3px solid ${DC_COLORS.crimson}`,
          paddingBottom: 16,
          marginBottom: 24,
        }}
      >
        <img
          src={DC_LOGO}
          alt="Demand Chain — 20+ Years Trusted Salesforce Partner"
          style={{ width: 220, height: "auto", display: "block", marginBottom: 12 }}
        />
        <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: DC_COLORS.charcoal }}>
          Fixed Bid Gross Margin Modeling
        </h1>
        <p style={{ fontSize: 13, color: "#6b6b6b", margin: "4px 0 0" }}>
          Single contract price against labor cost by role. Labor only — no overhead, discount, or non-labor cost inputs.
        </p>
      </div>

      {/* Margin floor warning */}
      {belowFloor && (
        <div
          style={{
            background: "#FDECEC",
            border: `1px solid ${DC_COLORS.crimson}`,
            borderRadius: 8,
            padding: "12px 16px",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TrendingDown size={20} color={DC_COLORS.crimson} />
          <div style={{ fontSize: 13, color: DC_COLORS.crimson, fontWeight: 700 }}>
            Gross margin is below the {MARGIN_FLOOR}% target floor. Review staffing mix or contract price before proceeding.
          </div>
        </div>
      )}

      {/* Contract price input */}
      <div
        style={{
          background: "#fafafa",
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          padding: "16px 20px",
          marginBottom: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <label style={{ fontSize: 14, fontWeight: 700, color: DC_COLORS.navy }}>
          Total fixed bid (contract price)
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 18, color: "#6b6b6b" }}>$</span>
          <input
            type="number"
            value={contractPrice}
            onChange={(e) => setContractPrice(e.target.value)}
            style={{
              fontSize: 20,
              fontWeight: 700,
              padding: "8px 10px",
              border: `1px solid ${DC_COLORS.navy}`,
              borderRadius: 6,
              width: 180,
              color: DC_COLORS.navy,
            }}
          />
        </div>
      </div>

      {/* Role table */}
      <div style={{ marginBottom: 12 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 110px 130px 130px 40px",
            gap: 8,
            padding: "0 8px",
            fontSize: 11,
            fontWeight: 700,
            color: "#6b6b6b",
            letterSpacing: 0.5,
            marginBottom: 6,
          }}
        >
          <div>ROLE</div>
          <div>HOURS</div>
          <div>COST RATE ($/HR)</div>
          <div>ROLE COST</div>
          <div></div>
        </div>

        {roles.map((role) => {
          const roleCost = (Number(role.hours) || 0) * (Number(role.rate) || 0);
          return (
            <div
              key={role.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 110px 130px 130px 40px",
                gap: 8,
                alignItems: "center",
                padding: "8px",
                borderBottom: "1px solid #eee",
              }}
            >
              <select
                value={role.name}
                onChange={(e) => updateRole(role.id, "name", e.target.value)}
                style={{
                  padding: "8px 10px",
                  border: "1px solid #d0d0d0",
                  borderRadius: 6,
                  fontSize: 14,
                  background: "white",
                  color: DC_COLORS.charcoal,
                }}
              >
                {ROLE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={role.hours}
                onChange={(e) => updateRole(role.id, "hours", e.target.value)}
                style={{
                  padding: "8px 10px",
                  border: "1px solid #d0d0d0",
                  borderRadius: 6,
                  fontSize: 14,
                }}
              />
              <input
                type="number"
                value={role.rate}
                onChange={(e) => updateRole(role.id, "rate", e.target.value)}
                style={{
                  padding: "8px 10px",
                  border: "1px solid #d0d0d0",
                  borderRadius: 6,
                  fontSize: 14,
                }}
              />
              <div style={{ fontSize: 14, fontWeight: 700, color: DC_COLORS.charcoal }}>
                {formatCurrency(roleCost)}
              </div>
              <button
                onClick={() => removeRole(role.id)}
                aria-label="Remove role"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#999",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          );
        })}

        <button
          onClick={addRole}
          style={{
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: `1px dashed ${DC_COLORS.navy}`,
            borderRadius: 6,
            color: DC_COLORS.navy,
            fontSize: 13,
            fontWeight: 700,
            padding: "8px 14px",
            cursor: "pointer",
          }}
        >
          <Plus size={14} /> Add role
        </button>
      </div>

      {/* Summary */}
      <div
        style={{
          marginTop: 28,
          borderRadius: 10,
          border: `1px solid ${DC_COLORS.navy}`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: DC_COLORS.navy,
            color: "white",
            padding: "10px 20px",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 0.5,
          }}
        >
          MARGIN SUMMARY
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 0,
          }}
        >
          <SummaryCell label="Total hours" value={totals.totalHours.toLocaleString()} />
          <SummaryCell label="Total labor cost" value={formatCurrency(totals.totalCost)} />
          <SummaryCell label="Blended cost rate" value={`${formatCurrency(totals.blendedRate)}/hr`} />
          <SummaryCell label="Effective bill rate" value={`${formatCurrency(totals.effectiveBillRate)}/hr`} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            background: "#fafafa",
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: "#6b6b6b", fontWeight: 700 }}>GROSS MARGIN</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: marginColor(totals.marginPct) }}>
              {formatCurrency(totals.grossMargin)}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: "#6b6b6b", fontWeight: 700 }}>MARGIN %</div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: marginColor(totals.marginPct),
                display: "flex",
                alignItems: "center",
                gap: 6,
                justifyContent: "flex-end",
              }}
            >
              {isHealthy ? <TrendingUp size={22} /> : <TrendingDown size={22} />}
              {formatPercent(totals.marginPct)}
            </div>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 11, color: "#999", marginTop: 16 }}>
        Labor-only model: gross margin = contract price − Σ(hours × cost rate). Target band is{" "}
        {MARGIN_FLOOR}–{MARGIN_CEIL}%. Discounts, contingency, non-labor costs (travel, licenses) are not included.
      </p>
    </div>
  );
}
