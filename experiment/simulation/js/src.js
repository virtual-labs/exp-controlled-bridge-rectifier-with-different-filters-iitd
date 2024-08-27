const src = {
  // pick imgs from the dom

  allImgs: [],
  allImgsDom: document.querySelectorAll(".main-window-imgs"),
  allVideosDom: document.querySelectorAll(".main-window-videos"),

  // ! new added
  allQsDom: document.querySelectorAll(".qs"),


  set() {
    let index = 0;
    this.allItems = {

      // !Template images
      arrowRound: this.allImgsDom[index++],
      blinkArrow: this.allImgsDom[index++],
      laerrow: this.allImgsDom[index++],
      laerrow2: this.allImgsDom[index++],
      logo: this.allImgsDom[index++],
      man: this.allImgsDom[index++],
      measurearrow: this.allImgsDom[index++],
      measurearrow2: this.allImgsDom[index++],
      redsize: this.allImgsDom[index++],                                         
      speech_off_btn: this.allImgsDom[index++],
      speech_on_btn: this.allImgsDom[index++],
      talk_cloud: this.allImgsDom[index++],
      iit_delhi_logo: this.allImgsDom[index++],
      // !Template images end

      // ! Procedure formula Nomenclature images 
      formulas_component_stress:this.allImgsDom[index++],
      formulas_efficiency:this.allImgsDom[index++],
      formulas_ideal:this.allImgsDom[index++],
      formulas_nomenclautre:this.allImgsDom[index++],
      formulas_non_ideal:this.allImgsDom[index++],
      formulas_procedure:this.allImgsDom[index++],
      formulas_universal:this.allImgsDom[index++],
      // ! Procedure formula Nomenclature images end

      //! EE20 images added here
      
          

      alpha_c_value:this.allImgsDom[index++],
      btn_delete:this.allImgsDom[index++],
      btn_hint:this.allImgsDom[index++],
      btn_plot:this.allImgsDom[index++],
      btn_record:this.allImgsDom[index++],
      btn_reset:this.allImgsDom[index++],
      btn_reset_2:this.allImgsDom[index++],
      btn_verify:this.allImgsDom[index++],
      circuit_c:this.allImgsDom[index++],
      circuit_lc:this.allImgsDom[index++],
      hint_box_c_filter:this.allImgsDom[index++],
      hint_box_lc_filter:this.allImgsDom[index++],
      load_1:this.allImgsDom[index++],
      load_2:this.allImgsDom[index++],
      option_1:this.allImgsDom[index++],
      option_2:this.allImgsDom[index++],
      page_c_0:this.allImgsDom[index++],
      page_c_30:this.allImgsDom[index++],
      page_c_60:this.allImgsDom[index++],
      page_lc_0:this.allImgsDom[index++],
      page_lc_30:this.allImgsDom[index++],
      page_lc_60:this.allImgsDom[index++],
      select_option_full:this.allImgsDom[index++],
      tab_1:this.allImgsDom[index++],
      tab_1f:this.allImgsDom[index++],
      tab_2:this.allImgsDom[index++],
      tab_2f:this.allImgsDom[index++],
      tab_3:this.allImgsDom[index++],
      tab_3f:this.allImgsDom[index++],
      tab_4:this.allImgsDom[index++],
      tab_4f:this.allImgsDom[index++],
      tab_5:this.allImgsDom[index++],
      tab_5f:this.allImgsDom[index++],
      tab_c_0f_deg:this.allImgsDom[index++],
      tab_c_0_deg:this.allImgsDom[index++],
      tab_c_30f_deg:this.allImgsDom[index++],
      tab_c_30_deg:this.allImgsDom[index++],
      tab_c_60f_deg:this.allImgsDom[index++],
      tab_c_60_deg:this.allImgsDom[index++],
      tab_lc_0_deg:this.allImgsDom[index++],
      tab_lc_30_deg:this.allImgsDom[index++],
      tab_lc_60_deg:this.allImgsDom[index++],
      text_c_filter:this.allImgsDom[index++],
      text_lc_filter:this.allImgsDom[index++],
      text_performance_characteristics:this.allImgsDom[index++],
      val_100:this.allImgsDom[index++],
      val_1000:this.allImgsDom[index++],
      val_220:this.allImgsDom[index++],
      val_680:this.allImgsDom[index++],
      option_1_circuit:this.allImgsDom[index++],
      graph_bcg:this.allImgsDom[index++],
      tab_c_filter:this.allImgsDom[index++],
      right_tick_1:this.allImgsDom[index++],
      right_tick_2:this.allImgsDom[index++],
      white_bcg:this.allImgsDom[index++],
      green_line:this.allImgsDom[index++],
      load_1f:this.allImgsDom[index++],
      load_2f:this.allImgsDom[index++],
      val_100f:this.allImgsDom[index++],
      val_220f:this.allImgsDom[index++],
      val_680f:this.allImgsDom[index++],
      val_1000f:this.allImgsDom[index++],

      btn_plot:this.allImgsDom[index++],
      c_filter_val_1:this.allImgsDom[index++],
      C_filter_val_2:this.allImgsDom[index++],
      C_filter_val_3:this.allImgsDom[index++],
      l_filter_val_1:this.allImgsDom[index++],
      l_filter_val_2:this.allImgsDom[index++],
      l_filter_val_3:this.allImgsDom[index++],
      option_2_components:this.allImgsDom[index++],
      option_2_graph_bcg:this.allImgsDom[index++],
      option_2_load:this.allImgsDom[index++],
      tab_0:this.allImgsDom[index++],
      tab_30:this.allImgsDom[index++],
      tab_60:this.allImgsDom[index++],


      option_2_circuit:this.allImgsDom[index++],
      tab_deg:this.allImgsDom[index++],
      tab_filter_1:this.allImgsDom[index++],
      tab_filter_2:this.allImgsDom[index++],

      option_2_tab_1:this.allImgsDom[index++],
      option_2_tab_2:this.allImgsDom[index++],
      option_2_tab_3:this.allImgsDom[index++],



      //! EE20 images end here



      // * Question Mark
      domQs1: this.allQsDom[0],
      domQs2: this.allQsDom[1],
      domQs3: this.allQsDom[2],
      domQs4: this.allQsDom[3],
      domQs5: this.allQsDom[4],
      domQs6: this.allQsDom[5],
      
      
      // * Videos
      // yoke_front_to_back: this.allVideosDom[0],
      // yoke_front_to_side: this.allVideosDom[1],
      // panel1: this.allVideosDom[2],
      // panel2: this.allVideosDom[3],

      bfs_video: this.allVideosDom[0],
    };
  },
  allImgsInitialAxis: [],
  get(itemName) {
    return this.allItems[itemName];
  },
};
// setting src
src.set();
