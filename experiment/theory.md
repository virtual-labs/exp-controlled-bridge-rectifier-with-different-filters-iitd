### Theory

The circuit configuration of singe-phase controlled bridge rectifier is given in Fig. 1.<br>
<center>
  <img src="images/th1.png" height="220px">
  
Fig. 1. Circuit configuration of single-phase controlled bridge rectifier.

</center>
<br>
The controlled-bridge rectifier is shown in Fig. 1 feeding the power to the load. Due to rectifier operation the load voltage is rectified AC exhibiting high peak-to-peak ripple voltage. To reduce the peak-to-peak ripple it is necessary to connect low-pass filter circuits between bridge and load and they are: (a) C-filter, (b) L-filter and (c) LC-filter. Among these filter configurations, C-filter and LC-filter structures are effective in reducing the peak-to-peak content and hence their brief description is given in the following paragraphs.<br>

The capacitor filter is a cost-effective and widely used filter configuration. The diagram illustrating the configuration of the capacitor filter is shown in Fig. 2. The capacitor charges to the peak value of the input voltage and tries to maintain this level while the AC input decreases to zero. The capacitor will discharge through the load until the input voltage reaches to a level higher than the voltage across the capacitor. At this point, the rectifier will once again recharge the capacitor. The ripple voltage across the filter capacitor is a function of the filter capacitance value, AC supply frequency and the load current.<br>
<br>

<center>
  <img src="images/th2.png" height="220px">
  
<br>Fig.2. Circuit configuration of single phase controlled bridge rectifier with C-filter

</center>
<br>
The rectifier with LC-filter configuration incorporates an additional inductor between the rectifier and the capacitor filter. The inductor absorbs the ripple voltage and thus results in a smoothing effect leading to a decrease in the output voltage ripple as compared to the capacitor filter alone.
<br>

<center>
  <img src="images/th3.png" height="220px">
  
<br>Fig.3. Circuit configuration of single-phase controlled bridge rectifier with LC-filter.

</center>
<br>
Typical waveforms for controlled bridge rectifier with C-filter is given in Fig. 4<br>

<table border="0" align="center" style="width:100%; border:none;">
  <tr>
<td style="width:50%">
<center>

<img src="images/th4.png" height="450px;">
<br><br>
(a)
<br><br>
</center>
</td>
<td style="width:50%">
  
<center>

<img src="images/th5.png" height="450px;">
<br><br>
(b)
<br><br>
</center> 
    </td>
  </tr>
  <tr>
<td colspan="2" style="width:100%; background-color: #FFF;">
<center>

<img src="images/th6.png" height="450px;">
<br><br>
(c)
<br><br>
</center>
</td>
  </tr>

</table>
<br>

<div style="float: left; width:100%;"><br>
Fig. 4. Typical waveforms for controlled rectifier with C-Filter (a) α = 0&#176;, (b) α = 30&#176; and (c) α = 60&#176;.
<br><br>

<br>Typical waveforms for controlled bridge rectifier with LC-filter is given in Fig. 5<br>

<table border="0" align="center" style="width:100%; border:none;">
  <tr>
<td style="width:50%">
<center>

<img src="images/th7.png" height="450px;">
<br><br>
(a)
<br><br>
</center>
</td>
<td style="width:50%">
  
<center>

<img src="images/th8.png" height="450px;">
<br><br>
(b)
<br><br>
</center> 
    </td>
  </tr>
  <tr>
<td colspan="2" style="width:100%; background-color: #FFF;">
<center>

<img src="images/th9.png" height="450px;">
<br><br>
(c)
<br><br>
</center>
</td>
  </tr>

</table>
<br>

<div style="float: left; width:100%;"><br>
Fig. 5. Typical waveforms for controlled rectifier with L-C-Filter (a) α = 0&#176;, (b) α = 30&#176; and (c) α = 60&#176;.
<br><br>

</div>

<div style="float: left; width:100%;"><br>

#### C-Filter<br>
</div>

<br>


<div style="float: left; width:100%;"><br>
  
Various mathematical expressions are given below to quantify the rectifier performance parameters. Average voltage appearing across load is defined by<br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th10.png" height="60px">
</div>
<div style="float: right; width:50%; text-align:center;">
    ..(1)
</div>
<br>

<div style="float: left; width:100%;">
Average load current is given by
</div>

<div style="float: left; width:50%;">
  <img src="images/th11.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(2)

</div>
<br>

<div style="float: left; width:100%;"><br>
where,<br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th12.png" height="70px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(3)

</div>
<br>

<div style="float: left; width:100%;"><br>
The peak-to-peak ripple in output voltage is given by
</div>

<div style="float: left; width:50%;">
  <img src="images/th13.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(4)

</div>
<br>

<div style="float: left; width:100%;"><br>
  The AC component in rectifier output voltage is given by
</div><br>

<div style="float: left; width:50%;">
  <img src="images/th14.png" height="50px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(5)

</div>
<br>

<div style="float: left; width:100%;"><br>
The ripple factor is given by
</div><br>

<div style="float: left; width:50%;">
  <img src="images/th15.png" height="50px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(6)

</div>
<br>

<div style="float: left; width:100%;"><br>
If the firing angle of controlled rectifier with C-filter is less than the critical value of firing angle (αc) then the rectifier works as an uncontrolled rectifier and the firing angle change in this range will not affect the nature of output voltage waveform as shown in Fig. 6. However, when the firing angle is higher than “αc” then the load voltage linearly decreases with firing angle. 
<br>
</div>

<div style="float: left; width:100%;"><br>
<center>
  <img src="images/th16.png" height="220px">
  
<br>Fig. 6. Output load voltage with and without capacitor filter.

</center>
<br>
</div>


<div style="float: left; width:100%;"><br>

#### LC-Filter<br>
</div>

<br>

<div style="float: left; width:100%;"><br>
Various mathematical expressions are given below to quantify the rectifier performance parameters. Average voltage appearing across load is defined by
<br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th17.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(7)

</div>
<br><br>

<div style="float: left; width:100%;"><br>
The peak-to-peak ripple in output voltage is given by
<br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th18.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(8)

</div>
<br>
<br><br>

<div style="float: left; width:100%;"><br>
where V<sub>0_2h</sub>  is the 2nd harmonic (dominating harmonic) component.<br>
The ripple factor is given by
<br>
</div>

<div style="float: left; width:50%;">
  <img src="images/th19.png" height="60px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(9)

</div>
<br>
