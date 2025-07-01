
var initZ3 = (() => {
  var _scriptName = typeof document != 'undefined' ? document.currentScript?.src : undefined;
  if (typeof __filename != 'undefined') _scriptName = _scriptName || __filename;
  return (
function(moduleArg = {}) {
  var moduleRtn;

// include: shell.js
// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(moduleArg) => Promise<Module>
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = moduleArg;

// Set up the promise that indicates the Module is initialized
var readyPromiseResolve, readyPromiseReject;
var readyPromise = new Promise((resolve, reject) => {
  readyPromiseResolve = resolve;
  readyPromiseReject = reject;
});
["_malloc","_free","_set_throwy_error_handler","_set_noop_error_handler","_async_Z3_eval_smtlib2_string","_async_Z3_simplify","_async_Z3_simplify_ex","_async_Z3_solver_check","_async_Z3_solver_check_assumptions","_async_Z3_solver_cube","_async_Z3_solver_get_consequences","_async_Z3_tactic_apply","_async_Z3_tactic_apply_ex","_async_Z3_optimize_check","_async_Z3_algebraic_roots","_async_Z3_algebraic_eval","_async_Z3_fixedpoint_query","_async_Z3_fixedpoint_query_relations","_async_Z3_fixedpoint_query_from_lvl","_async_Z3_polynomial_subresultants","_Z3_global_param_set","_Z3_global_param_reset_all","_Z3_global_param_get","_Z3_mk_config","_Z3_del_config","_Z3_set_param_value","_Z3_mk_context","_Z3_mk_context_rc","_Z3_del_context","_Z3_inc_ref","_Z3_dec_ref","_Z3_update_param_value","_Z3_get_global_param_descrs","_Z3_interrupt","_Z3_enable_concurrent_dec_ref","_Z3_mk_params","_Z3_params_inc_ref","_Z3_params_dec_ref","_Z3_params_set_bool","_Z3_params_set_uint","_Z3_params_set_double","_Z3_params_set_symbol","_Z3_params_to_string","_Z3_params_validate","_Z3_param_descrs_inc_ref","_Z3_param_descrs_dec_ref","_Z3_param_descrs_get_kind","_Z3_param_descrs_size","_Z3_param_descrs_get_name","_Z3_param_descrs_get_documentation","_Z3_param_descrs_to_string","_Z3_mk_int_symbol","_Z3_mk_string_symbol","_Z3_mk_uninterpreted_sort","_Z3_mk_type_variable","_Z3_mk_bool_sort","_Z3_mk_int_sort","_Z3_mk_real_sort","_Z3_mk_bv_sort","_Z3_mk_finite_domain_sort","_Z3_mk_array_sort","_Z3_mk_array_sort_n","_Z3_mk_tuple_sort","_Z3_mk_enumeration_sort","_Z3_mk_list_sort","_Z3_mk_constructor","_Z3_constructor_num_fields","_Z3_del_constructor","_Z3_mk_datatype","_Z3_mk_datatype_sort","_Z3_mk_constructor_list","_Z3_del_constructor_list","_Z3_mk_datatypes","_Z3_query_constructor","_Z3_mk_func_decl","_Z3_mk_app","_Z3_mk_const","_Z3_mk_fresh_func_decl","_Z3_mk_fresh_const","_Z3_mk_rec_func_decl","_Z3_add_rec_def","_Z3_mk_true","_Z3_mk_false","_Z3_mk_eq","_Z3_mk_distinct","_Z3_mk_not","_Z3_mk_ite","_Z3_mk_iff","_Z3_mk_implies","_Z3_mk_xor","_Z3_mk_and","_Z3_mk_or","_Z3_mk_add","_Z3_mk_mul","_Z3_mk_sub","_Z3_mk_unary_minus","_Z3_mk_div","_Z3_mk_mod","_Z3_mk_rem","_Z3_mk_power","_Z3_mk_abs","_Z3_mk_lt","_Z3_mk_le","_Z3_mk_gt","_Z3_mk_ge","_Z3_mk_divides","_Z3_mk_int2real","_Z3_mk_real2int","_Z3_mk_is_int","_Z3_mk_bvnot","_Z3_mk_bvredand","_Z3_mk_bvredor","_Z3_mk_bvand","_Z3_mk_bvor","_Z3_mk_bvxor","_Z3_mk_bvnand","_Z3_mk_bvnor","_Z3_mk_bvxnor","_Z3_mk_bvneg","_Z3_mk_bvadd","_Z3_mk_bvsub","_Z3_mk_bvmul","_Z3_mk_bvudiv","_Z3_mk_bvsdiv","_Z3_mk_bvurem","_Z3_mk_bvsrem","_Z3_mk_bvsmod","_Z3_mk_bvult","_Z3_mk_bvslt","_Z3_mk_bvule","_Z3_mk_bvsle","_Z3_mk_bvuge","_Z3_mk_bvsge","_Z3_mk_bvugt","_Z3_mk_bvsgt","_Z3_mk_concat","_Z3_mk_extract","_Z3_mk_sign_ext","_Z3_mk_zero_ext","_Z3_mk_repeat","_Z3_mk_bit2bool","_Z3_mk_bvshl","_Z3_mk_bvlshr","_Z3_mk_bvashr","_Z3_mk_rotate_left","_Z3_mk_rotate_right","_Z3_mk_ext_rotate_left","_Z3_mk_ext_rotate_right","_Z3_mk_int2bv","_Z3_mk_bv2int","_Z3_mk_bvadd_no_overflow","_Z3_mk_bvadd_no_underflow","_Z3_mk_bvsub_no_overflow","_Z3_mk_bvsub_no_underflow","_Z3_mk_bvsdiv_no_overflow","_Z3_mk_bvneg_no_overflow","_Z3_mk_bvmul_no_overflow","_Z3_mk_bvmul_no_underflow","_Z3_mk_select","_Z3_mk_select_n","_Z3_mk_store","_Z3_mk_store_n","_Z3_mk_const_array","_Z3_mk_map","_Z3_mk_array_default","_Z3_mk_as_array","_Z3_mk_set_has_size","_Z3_mk_set_sort","_Z3_mk_empty_set","_Z3_mk_full_set","_Z3_mk_set_add","_Z3_mk_set_del","_Z3_mk_set_union","_Z3_mk_set_intersect","_Z3_mk_set_difference","_Z3_mk_set_complement","_Z3_mk_set_member","_Z3_mk_set_subset","_Z3_mk_array_ext","_Z3_mk_numeral","_Z3_mk_real","_Z3_mk_real_int64","_Z3_mk_int","_Z3_mk_unsigned_int","_Z3_mk_int64","_Z3_mk_unsigned_int64","_Z3_mk_bv_numeral","_Z3_mk_seq_sort","_Z3_is_seq_sort","_Z3_get_seq_sort_basis","_Z3_mk_re_sort","_Z3_is_re_sort","_Z3_get_re_sort_basis","_Z3_mk_string_sort","_Z3_mk_char_sort","_Z3_is_string_sort","_Z3_is_char_sort","_Z3_mk_string","_Z3_mk_lstring","_Z3_mk_u32string","_Z3_is_string","_Z3_get_string","_Z3_get_lstring","_Z3_get_string_length","_Z3_get_string_contents","_Z3_mk_seq_empty","_Z3_mk_seq_unit","_Z3_mk_seq_concat","_Z3_mk_seq_prefix","_Z3_mk_seq_suffix","_Z3_mk_seq_contains","_Z3_mk_str_lt","_Z3_mk_str_le","_Z3_mk_seq_extract","_Z3_mk_seq_replace","_Z3_mk_seq_at","_Z3_mk_seq_nth","_Z3_mk_seq_length","_Z3_mk_seq_index","_Z3_mk_seq_last_index","_Z3_mk_seq_map","_Z3_mk_seq_mapi","_Z3_mk_seq_foldl","_Z3_mk_seq_foldli","_Z3_mk_str_to_int","_Z3_mk_int_to_str","_Z3_mk_string_to_code","_Z3_mk_string_from_code","_Z3_mk_ubv_to_str","_Z3_mk_sbv_to_str","_Z3_mk_seq_to_re","_Z3_mk_seq_in_re","_Z3_mk_re_plus","_Z3_mk_re_star","_Z3_mk_re_option","_Z3_mk_re_union","_Z3_mk_re_concat","_Z3_mk_re_range","_Z3_mk_re_allchar","_Z3_mk_re_loop","_Z3_mk_re_power","_Z3_mk_re_intersect","_Z3_mk_re_complement","_Z3_mk_re_diff","_Z3_mk_re_empty","_Z3_mk_re_full","_Z3_mk_char","_Z3_mk_char_le","_Z3_mk_char_to_int","_Z3_mk_char_to_bv","_Z3_mk_char_from_bv","_Z3_mk_char_is_digit","_Z3_mk_linear_order","_Z3_mk_partial_order","_Z3_mk_piecewise_linear_order","_Z3_mk_tree_order","_Z3_mk_transitive_closure","_Z3_mk_pattern","_Z3_mk_bound","_Z3_mk_forall","_Z3_mk_exists","_Z3_mk_quantifier","_Z3_mk_quantifier_ex","_Z3_mk_forall_const","_Z3_mk_exists_const","_Z3_mk_quantifier_const","_Z3_mk_quantifier_const_ex","_Z3_mk_lambda","_Z3_mk_lambda_const","_Z3_get_symbol_kind","_Z3_get_symbol_int","_Z3_get_symbol_string","_Z3_get_sort_name","_Z3_get_sort_id","_Z3_sort_to_ast","_Z3_is_eq_sort","_Z3_get_sort_kind","_Z3_get_bv_sort_size","_Z3_get_finite_domain_sort_size","_Z3_get_array_arity","_Z3_get_array_sort_domain","_Z3_get_array_sort_domain_n","_Z3_get_array_sort_range","_Z3_get_tuple_sort_mk_decl","_Z3_get_tuple_sort_num_fields","_Z3_get_tuple_sort_field_decl","_Z3_is_recursive_datatype_sort","_Z3_get_datatype_sort_num_constructors","_Z3_get_datatype_sort_constructor","_Z3_get_datatype_sort_recognizer","_Z3_get_datatype_sort_constructor_accessor","_Z3_datatype_update_field","_Z3_get_relation_arity","_Z3_get_relation_column","_Z3_mk_atmost","_Z3_mk_atleast","_Z3_mk_pble","_Z3_mk_pbge","_Z3_mk_pbeq","_Z3_func_decl_to_ast","_Z3_is_eq_func_decl","_Z3_get_func_decl_id","_Z3_get_decl_name","_Z3_get_decl_kind","_Z3_get_domain_size","_Z3_get_arity","_Z3_get_domain","_Z3_get_range","_Z3_get_decl_num_parameters","_Z3_get_decl_parameter_kind","_Z3_get_decl_int_parameter","_Z3_get_decl_double_parameter","_Z3_get_decl_symbol_parameter","_Z3_get_decl_sort_parameter","_Z3_get_decl_ast_parameter","_Z3_get_decl_func_decl_parameter","_Z3_get_decl_rational_parameter","_Z3_app_to_ast","_Z3_get_app_decl","_Z3_get_app_num_args","_Z3_get_app_arg","_Z3_is_eq_ast","_Z3_get_ast_id","_Z3_get_ast_hash","_Z3_get_sort","_Z3_is_well_sorted","_Z3_get_bool_value","_Z3_get_ast_kind","_Z3_is_app","_Z3_is_ground","_Z3_get_depth","_Z3_is_numeral_ast","_Z3_is_algebraic_number","_Z3_to_app","_Z3_to_func_decl","_Z3_get_numeral_string","_Z3_get_numeral_binary_string","_Z3_get_numeral_decimal_string","_Z3_get_numeral_double","_Z3_get_numerator","_Z3_get_denominator","_Z3_get_numeral_small","_Z3_get_numeral_int","_Z3_get_numeral_uint","_Z3_get_numeral_uint64","_Z3_get_numeral_int64","_Z3_get_numeral_rational_int64","_Z3_get_algebraic_number_lower","_Z3_get_algebraic_number_upper","_Z3_pattern_to_ast","_Z3_get_pattern_num_terms","_Z3_get_pattern","_Z3_get_index_value","_Z3_is_quantifier_forall","_Z3_is_quantifier_exists","_Z3_is_lambda","_Z3_get_quantifier_weight","_Z3_get_quantifier_skolem_id","_Z3_get_quantifier_id","_Z3_get_quantifier_num_patterns","_Z3_get_quantifier_pattern_ast","_Z3_get_quantifier_num_no_patterns","_Z3_get_quantifier_no_pattern_ast","_Z3_get_quantifier_num_bound","_Z3_get_quantifier_bound_name","_Z3_get_quantifier_bound_sort","_Z3_get_quantifier_body","_Z3_simplify","_Z3_simplify_ex","_Z3_simplify_get_help","_Z3_simplify_get_param_descrs","_Z3_update_term","_Z3_substitute","_Z3_substitute_vars","_Z3_substitute_funs","_Z3_translate","_Z3_mk_model","_Z3_model_inc_ref","_Z3_model_dec_ref","_Z3_model_eval","_Z3_model_get_const_interp","_Z3_model_has_interp","_Z3_model_get_func_interp","_Z3_model_get_num_consts","_Z3_model_get_const_decl","_Z3_model_get_num_funcs","_Z3_model_get_func_decl","_Z3_model_get_num_sorts","_Z3_model_get_sort","_Z3_model_get_sort_universe","_Z3_model_translate","_Z3_is_as_array","_Z3_get_as_array_func_decl","_Z3_add_func_interp","_Z3_add_const_interp","_Z3_func_interp_inc_ref","_Z3_func_interp_dec_ref","_Z3_func_interp_get_num_entries","_Z3_func_interp_get_entry","_Z3_func_interp_get_else","_Z3_func_interp_set_else","_Z3_func_interp_get_arity","_Z3_func_interp_add_entry","_Z3_func_entry_inc_ref","_Z3_func_entry_dec_ref","_Z3_func_entry_get_value","_Z3_func_entry_get_num_args","_Z3_func_entry_get_arg","_Z3_open_log","_Z3_append_log","_Z3_close_log","_Z3_toggle_warning_messages","_Z3_set_ast_print_mode","_Z3_ast_to_string","_Z3_pattern_to_string","_Z3_sort_to_string","_Z3_func_decl_to_string","_Z3_model_to_string","_Z3_benchmark_to_smtlib_string","_Z3_parse_smtlib2_string","_Z3_parse_smtlib2_file","_Z3_eval_smtlib2_string","_Z3_mk_parser_context","_Z3_parser_context_inc_ref","_Z3_parser_context_dec_ref","_Z3_parser_context_add_sort","_Z3_parser_context_add_decl","_Z3_parser_context_from_string","_Z3_get_error_code","_Z3_set_error","_Z3_get_error_msg","_Z3_get_version","_Z3_get_full_version","_Z3_enable_trace","_Z3_disable_trace","_Z3_reset_memory","_Z3_finalize_memory","_Z3_mk_goal","_Z3_goal_inc_ref","_Z3_goal_dec_ref","_Z3_goal_precision","_Z3_goal_assert","_Z3_goal_inconsistent","_Z3_goal_depth","_Z3_goal_reset","_Z3_goal_size","_Z3_goal_formula","_Z3_goal_num_exprs","_Z3_goal_is_decided_sat","_Z3_goal_is_decided_unsat","_Z3_goal_translate","_Z3_goal_convert_model","_Z3_goal_to_string","_Z3_goal_to_dimacs_string","_Z3_mk_tactic","_Z3_tactic_inc_ref","_Z3_tactic_dec_ref","_Z3_mk_probe","_Z3_probe_inc_ref","_Z3_probe_dec_ref","_Z3_tactic_and_then","_Z3_tactic_or_else","_Z3_tactic_par_or","_Z3_tactic_par_and_then","_Z3_tactic_try_for","_Z3_tactic_when","_Z3_tactic_cond","_Z3_tactic_repeat","_Z3_tactic_skip","_Z3_tactic_fail","_Z3_tactic_fail_if","_Z3_tactic_fail_if_not_decided","_Z3_tactic_using_params","_Z3_mk_simplifier","_Z3_simplifier_inc_ref","_Z3_simplifier_dec_ref","_Z3_solver_add_simplifier","_Z3_simplifier_and_then","_Z3_simplifier_using_params","_Z3_get_num_simplifiers","_Z3_get_simplifier_name","_Z3_simplifier_get_help","_Z3_simplifier_get_param_descrs","_Z3_simplifier_get_descr","_Z3_probe_const","_Z3_probe_lt","_Z3_probe_gt","_Z3_probe_le","_Z3_probe_ge","_Z3_probe_eq","_Z3_probe_and","_Z3_probe_or","_Z3_probe_not","_Z3_get_num_tactics","_Z3_get_tactic_name","_Z3_get_num_probes","_Z3_get_probe_name","_Z3_tactic_get_help","_Z3_tactic_get_param_descrs","_Z3_tactic_get_descr","_Z3_probe_get_descr","_Z3_probe_apply","_Z3_tactic_apply","_Z3_tactic_apply_ex","_Z3_apply_result_inc_ref","_Z3_apply_result_dec_ref","_Z3_apply_result_to_string","_Z3_apply_result_get_num_subgoals","_Z3_apply_result_get_subgoal","_Z3_mk_solver","_Z3_mk_simple_solver","_Z3_mk_solver_for_logic","_Z3_mk_solver_from_tactic","_Z3_solver_translate","_Z3_solver_import_model_converter","_Z3_solver_get_help","_Z3_solver_get_param_descrs","_Z3_solver_set_params","_Z3_solver_inc_ref","_Z3_solver_dec_ref","_Z3_solver_interrupt","_Z3_solver_push","_Z3_solver_pop","_Z3_solver_reset","_Z3_solver_get_num_scopes","_Z3_solver_assert","_Z3_solver_assert_and_track","_Z3_solver_from_file","_Z3_solver_from_string","_Z3_solver_get_assertions","_Z3_solver_get_units","_Z3_solver_get_trail","_Z3_solver_get_non_units","_Z3_solver_get_levels","_Z3_solver_congruence_root","_Z3_solver_congruence_next","_Z3_solver_congruence_explain","_Z3_solver_solve_for","_Z3_solver_register_on_clause","_Z3_solver_propagate_init","_Z3_solver_propagate_fixed","_Z3_solver_propagate_final","_Z3_solver_propagate_eq","_Z3_solver_propagate_diseq","_Z3_solver_propagate_created","_Z3_solver_propagate_decide","_Z3_solver_next_split","_Z3_solver_propagate_declare","_Z3_solver_propagate_register","_Z3_solver_propagate_register_cb","_Z3_solver_propagate_consequence","_Z3_solver_set_initial_value","_Z3_solver_check","_Z3_solver_check_assumptions","_Z3_get_implied_equalities","_Z3_solver_get_consequences","_Z3_solver_cube","_Z3_solver_get_model","_Z3_solver_get_proof","_Z3_solver_get_unsat_core","_Z3_solver_get_reason_unknown","_Z3_solver_get_statistics","_Z3_solver_to_string","_Z3_solver_to_dimacs_string","_Z3_stats_to_string","_Z3_stats_inc_ref","_Z3_stats_dec_ref","_Z3_stats_size","_Z3_stats_get_key","_Z3_stats_is_uint","_Z3_stats_is_double","_Z3_stats_get_uint_value","_Z3_stats_get_double_value","_Z3_get_estimated_alloc_size","_Z3_algebraic_is_value","_Z3_algebraic_is_pos","_Z3_algebraic_is_neg","_Z3_algebraic_is_zero","_Z3_algebraic_sign","_Z3_algebraic_add","_Z3_algebraic_sub","_Z3_algebraic_mul","_Z3_algebraic_div","_Z3_algebraic_root","_Z3_algebraic_power","_Z3_algebraic_lt","_Z3_algebraic_gt","_Z3_algebraic_le","_Z3_algebraic_ge","_Z3_algebraic_eq","_Z3_algebraic_neq","_Z3_algebraic_roots","_Z3_algebraic_eval","_Z3_algebraic_get_poly","_Z3_algebraic_get_i","_Z3_mk_ast_vector","_Z3_ast_vector_inc_ref","_Z3_ast_vector_dec_ref","_Z3_ast_vector_size","_Z3_ast_vector_get","_Z3_ast_vector_set","_Z3_ast_vector_resize","_Z3_ast_vector_push","_Z3_ast_vector_translate","_Z3_ast_vector_to_string","_Z3_mk_ast_map","_Z3_ast_map_inc_ref","_Z3_ast_map_dec_ref","_Z3_ast_map_contains","_Z3_ast_map_find","_Z3_ast_map_insert","_Z3_ast_map_erase","_Z3_ast_map_reset","_Z3_ast_map_size","_Z3_ast_map_keys","_Z3_ast_map_to_string","_Z3_mk_fixedpoint","_Z3_fixedpoint_inc_ref","_Z3_fixedpoint_dec_ref","_Z3_fixedpoint_add_rule","_Z3_fixedpoint_add_fact","_Z3_fixedpoint_assert","_Z3_fixedpoint_query","_Z3_fixedpoint_query_relations","_Z3_fixedpoint_get_answer","_Z3_fixedpoint_get_reason_unknown","_Z3_fixedpoint_update_rule","_Z3_fixedpoint_get_num_levels","_Z3_fixedpoint_get_cover_delta","_Z3_fixedpoint_add_cover","_Z3_fixedpoint_get_statistics","_Z3_fixedpoint_register_relation","_Z3_fixedpoint_set_predicate_representation","_Z3_fixedpoint_get_rules","_Z3_fixedpoint_get_assertions","_Z3_fixedpoint_set_params","_Z3_fixedpoint_get_help","_Z3_fixedpoint_get_param_descrs","_Z3_fixedpoint_to_string","_Z3_fixedpoint_from_string","_Z3_fixedpoint_from_file","_Z3_mk_fpa_rounding_mode_sort","_Z3_mk_fpa_round_nearest_ties_to_even","_Z3_mk_fpa_rne","_Z3_mk_fpa_round_nearest_ties_to_away","_Z3_mk_fpa_rna","_Z3_mk_fpa_round_toward_positive","_Z3_mk_fpa_rtp","_Z3_mk_fpa_round_toward_negative","_Z3_mk_fpa_rtn","_Z3_mk_fpa_round_toward_zero","_Z3_mk_fpa_rtz","_Z3_mk_fpa_sort","_Z3_mk_fpa_sort_half","_Z3_mk_fpa_sort_16","_Z3_mk_fpa_sort_single","_Z3_mk_fpa_sort_32","_Z3_mk_fpa_sort_double","_Z3_mk_fpa_sort_64","_Z3_mk_fpa_sort_quadruple","_Z3_mk_fpa_sort_128","_Z3_mk_fpa_nan","_Z3_mk_fpa_inf","_Z3_mk_fpa_zero","_Z3_mk_fpa_fp","_Z3_mk_fpa_numeral_float","_Z3_mk_fpa_numeral_double","_Z3_mk_fpa_numeral_int","_Z3_mk_fpa_numeral_int_uint","_Z3_mk_fpa_numeral_int64_uint64","_Z3_mk_fpa_abs","_Z3_mk_fpa_neg","_Z3_mk_fpa_add","_Z3_mk_fpa_sub","_Z3_mk_fpa_mul","_Z3_mk_fpa_div","_Z3_mk_fpa_fma","_Z3_mk_fpa_sqrt","_Z3_mk_fpa_rem","_Z3_mk_fpa_round_to_integral","_Z3_mk_fpa_min","_Z3_mk_fpa_max","_Z3_mk_fpa_leq","_Z3_mk_fpa_lt","_Z3_mk_fpa_geq","_Z3_mk_fpa_gt","_Z3_mk_fpa_eq","_Z3_mk_fpa_is_normal","_Z3_mk_fpa_is_subnormal","_Z3_mk_fpa_is_zero","_Z3_mk_fpa_is_infinite","_Z3_mk_fpa_is_nan","_Z3_mk_fpa_is_negative","_Z3_mk_fpa_is_positive","_Z3_mk_fpa_to_fp_bv","_Z3_mk_fpa_to_fp_float","_Z3_mk_fpa_to_fp_real","_Z3_mk_fpa_to_fp_signed","_Z3_mk_fpa_to_fp_unsigned","_Z3_mk_fpa_to_ubv","_Z3_mk_fpa_to_sbv","_Z3_mk_fpa_to_real","_Z3_fpa_get_ebits","_Z3_fpa_get_sbits","_Z3_fpa_is_numeral_nan","_Z3_fpa_is_numeral_inf","_Z3_fpa_is_numeral_zero","_Z3_fpa_is_numeral_normal","_Z3_fpa_is_numeral_subnormal","_Z3_fpa_is_numeral_positive","_Z3_fpa_is_numeral_negative","_Z3_fpa_get_numeral_sign_bv","_Z3_fpa_get_numeral_significand_bv","_Z3_fpa_get_numeral_sign","_Z3_fpa_get_numeral_significand_string","_Z3_fpa_get_numeral_significand_uint64","_Z3_fpa_get_numeral_exponent_string","_Z3_fpa_get_numeral_exponent_int64","_Z3_fpa_get_numeral_exponent_bv","_Z3_mk_fpa_to_ieee_bv","_Z3_mk_fpa_to_fp_int_real","_Z3_mk_optimize","_Z3_optimize_inc_ref","_Z3_optimize_dec_ref","_Z3_optimize_assert","_Z3_optimize_assert_and_track","_Z3_optimize_assert_soft","_Z3_optimize_maximize","_Z3_optimize_minimize","_Z3_optimize_push","_Z3_optimize_pop","_Z3_optimize_set_initial_value","_Z3_optimize_check","_Z3_optimize_get_reason_unknown","_Z3_optimize_get_model","_Z3_optimize_get_unsat_core","_Z3_optimize_set_params","_Z3_optimize_get_param_descrs","_Z3_optimize_get_lower","_Z3_optimize_get_upper","_Z3_optimize_get_lower_as_vector","_Z3_optimize_get_upper_as_vector","_Z3_optimize_to_string","_Z3_optimize_from_string","_Z3_optimize_from_file","_Z3_optimize_get_help","_Z3_optimize_get_statistics","_Z3_optimize_get_assertions","_Z3_optimize_get_objectives","_Z3_polynomial_subresultants","_Z3_rcf_del","_Z3_rcf_mk_rational","_Z3_rcf_mk_small_int","_Z3_rcf_mk_pi","_Z3_rcf_mk_e","_Z3_rcf_mk_infinitesimal","_Z3_rcf_mk_roots","_Z3_rcf_add","_Z3_rcf_sub","_Z3_rcf_mul","_Z3_rcf_div","_Z3_rcf_neg","_Z3_rcf_inv","_Z3_rcf_power","_Z3_rcf_lt","_Z3_rcf_gt","_Z3_rcf_le","_Z3_rcf_ge","_Z3_rcf_eq","_Z3_rcf_neq","_Z3_rcf_num_to_string","_Z3_rcf_num_to_decimal_string","_Z3_rcf_get_numerator_denominator","_Z3_rcf_is_rational","_Z3_rcf_is_algebraic","_Z3_rcf_is_infinitesimal","_Z3_rcf_is_transcendental","_Z3_rcf_extension_index","_Z3_rcf_transcendental_name","_Z3_rcf_infinitesimal_name","_Z3_rcf_num_coefficients","_Z3_rcf_coefficient","_Z3_rcf_interval","_Z3_rcf_num_sign_conditions","_Z3_rcf_sign_condition_sign","_Z3_rcf_num_sign_condition_coefficients","_Z3_rcf_sign_condition_coefficient","_Z3_fixedpoint_query_from_lvl","_Z3_fixedpoint_get_ground_sat_answer","_Z3_fixedpoint_get_rules_along_trace","_Z3_fixedpoint_get_rule_names_along_trace","_Z3_fixedpoint_add_invariant","_Z3_fixedpoint_get_reachable","_Z3_qe_model_project","_Z3_qe_model_project_skolem","_Z3_qe_model_project_with_witness","_Z3_model_extrapolate","_Z3_qe_lite","getExceptionMessage","incrementExceptionRefcount","decrementExceptionRefcount","___indirect_function_table","onRuntimeInitialized"].forEach((prop) => {
  if (!Object.getOwnPropertyDescriptor(readyPromise, prop)) {
    Object.defineProperty(readyPromise, prop, {
      get: () => abort('You are getting ' + prop + ' on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'),
      set: () => abort('You are setting ' + prop + ' on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'),
    });
  }
});

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

// Attempt to auto-detect the environment
var ENVIRONMENT_IS_WEB = typeof window == 'object';
var ENVIRONMENT_IS_WORKER = typeof WorkerGlobalScope != 'undefined';
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
var ENVIRONMENT_IS_NODE = typeof process == 'object' && typeof process.versions == 'object' && typeof process.versions.node == 'string' && process.type != 'renderer';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

// Three configurations we can be running in:
// 1) We could be the application main() thread running in the main JS UI thread. (ENVIRONMENT_IS_WORKER == false and ENVIRONMENT_IS_PTHREAD == false)
// 2) We could be the application main() thread proxied to worker. (with Emscripten -sPROXY_TO_WORKER) (ENVIRONMENT_IS_WORKER == true, ENVIRONMENT_IS_PTHREAD == false)
// 3) We could be an application pthread running in a worker. (ENVIRONMENT_IS_WORKER == true and ENVIRONMENT_IS_PTHREAD == true)

// The way we signal to a worker that it is hosting a pthread is to construct
// it with a specific name.
var ENVIRONMENT_IS_PTHREAD = ENVIRONMENT_IS_WORKER && self.name?.startsWith('em-pthread');

if (ENVIRONMENT_IS_PTHREAD) {
  assert(!globalThis.moduleLoaded, 'module should only be loaded once on each pthread worker');
  globalThis.moduleLoaded = true;
}

if (ENVIRONMENT_IS_NODE) {
  // `require()` is no-op in an ESM module, use `createRequire()` to construct
  // the require()` function.  This is only necessary for multi-environment
  // builds, `-sENVIRONMENT=node` emits a static import declaration instead.
  // TODO: Swap all `require()`'s with `import()`'s?

  var worker_threads = require('worker_threads');
  global.Worker = worker_threads.Worker;
  ENVIRONMENT_IS_WORKER = !worker_threads.isMainThread;
  // Under node we set `workerData` to `em-pthread` to signal that the worker
  // is hosting a pthread.
  ENVIRONMENT_IS_PTHREAD = ENVIRONMENT_IS_WORKER && worker_threads['workerData'] == 'em-pthread'
}

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)
// include: /home/runner/work/z3/z3/src/api/js/src/low-level/async-wrapper.js
// this wrapper works with async-fns to provide promise-based off-thread versions of some functions
// It's prepended directly by emscripten to the resulting z3-built.js

let threadTimeouts = [];

let capability = null;
function resolve_async(val) {
  // setTimeout is a workaround for https://github.com/emscripten-core/emscripten/issues/15900
  if (capability == null) {
    return;
  }
  let cap = capability;
  capability = null;

  setTimeout(() => {
    cap.resolve(val);
  }, 0);
}

function reject_async(val) {
  if (capability == null) {
    return;
  }
  let cap = capability;
  capability = null;

  setTimeout(() => {
    cap.reject(val);
  }, 0);
}

Module.async_call = function (f, ...args) {
  if (capability !== null) {
    throw new Error(`you can't execute multiple async functions at the same time; let the previous one finish first`);
  }
  let promise = new Promise((resolve, reject) => {
    capability = { resolve, reject };
  });
  f(...args);
  return promise;
};
// end include: /home/runner/work/z3/z3/src/api/js/src/low-level/async-wrapper.js


// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];
var thisProgram = './this.program';
var quit_ = (status, toThrow) => {
  throw toThrow;
};

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var readAsync, readBinary;

if (ENVIRONMENT_IS_NODE) {
  if (typeof process == 'undefined' || !process.release || process.release.name !== 'node') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  var nodeVersion = process.versions.node;
  var numericVersion = nodeVersion.split('.').slice(0, 3);
  numericVersion = (numericVersion[0] * 10000) + (numericVersion[1] * 100) + (numericVersion[2].split('-')[0] * 1);
  var minVersion = 160000;
  if (numericVersion < 160000) {
    throw new Error('This emscripten-generated code requires node v16.0.0 (detected v' + nodeVersion + ')');
  }

  // These modules will usually be used on Node.js. Load them eagerly to avoid
  // the complexity of lazy-loading.
  var fs = require('fs');
  var nodePath = require('path');

  scriptDirectory = __dirname + '/';

// include: node_shell_read.js
readBinary = (filename) => {
  // We need to re-wrap `file://` strings to URLs. Normalizing isn't
  // necessary in that case, the path should already be absolute.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  var ret = fs.readFileSync(filename);
  assert(ret.buffer);
  return ret;
};

readAsync = (filename, binary = true) => {
  // See the comment in the `readBinary` function.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  return new Promise((resolve, reject) => {
    fs.readFile(filename, binary ? undefined : 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(binary ? data.buffer : data);
    });
  });
};
// end include: node_shell_read.js
  if (!Module['thisProgram'] && process.argv.length > 1) {
    thisProgram = process.argv[1].replace(/\\/g, '/');
  }

  arguments_ = process.argv.slice(2);

  // MODULARIZE will export the module in the proper place outside, we don't need to export here

  quit_ = (status, toThrow) => {
    process.exitCode = status;
    throw toThrow;
  };

} else
if (ENVIRONMENT_IS_SHELL) {

  if ((typeof process == 'object' && typeof require === 'function') || typeof window == 'object' || typeof WorkerGlobalScope != 'undefined') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (typeof document != 'undefined' && document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // When MODULARIZE, this JS may be executed later, after document.currentScript
  // is gone, so we saved it, and we use it here instead of any other info.
  if (_scriptName) {
    scriptDirectory = _scriptName;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  // If scriptDirectory contains a query (starting with ?) or a fragment (starting with #),
  // they are removed because they could contain a slash.
  if (scriptDirectory.startsWith('blob:')) {
    scriptDirectory = '';
  } else {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, '').lastIndexOf('/')+1);
  }

  if (!(typeof window == 'object' || typeof WorkerGlobalScope != 'undefined')) throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  // Differentiate the Web Worker from the Node Worker case, as reading must
  // be done differently.
  if (!ENVIRONMENT_IS_NODE)
  {
// include: web_or_worker_shell_read.js
if (ENVIRONMENT_IS_WORKER) {
    readBinary = (url) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.responseType = 'arraybuffer';
      xhr.send(null);
      return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
    };
  }

  readAsync = (url) => {
    // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
    // See https://github.com/github/fetch/pull/92#issuecomment-140665932
    // Cordova or Electron apps are typically loaded from a file:// url.
    // So use XHR on webview if URL is a file URL.
    if (isFileURI(url)) {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = () => {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            resolve(xhr.response);
            return;
          }
          reject(xhr.status);
        };
        xhr.onerror = reject;
        xhr.send(null);
      });
    }
    return fetch(url, { credentials: 'same-origin' })
      .then((response) => {
        if (response.ok) {
          return response.arrayBuffer();
        }
        return Promise.reject(new Error(response.status + ' : ' + response.url));
      })
  };
// end include: web_or_worker_shell_read.js
  }
} else
{
  throw new Error('environment detection error');
}

// Set up the out() and err() hooks, which are how we can print to stdout or
// stderr, respectively.
// Normally just binding console.log/console.error here works fine, but
// under node (with workers) we see missing/out-of-order messages so route
// directly to stdout and stderr.
// See https://github.com/emscripten-core/emscripten/issues/14804
var defaultPrint = console.log.bind(console);
var defaultPrintErr = console.error.bind(console);
if (ENVIRONMENT_IS_NODE) {
  defaultPrint = (...args) => fs.writeSync(1, args.join(' ') + '\n');
  defaultPrintErr = (...args) => fs.writeSync(2, args.join(' ') + '\n');
}
var out = Module['print'] || defaultPrint;
var err = Module['printErr'] || defaultPrintErr;

// Merge back in the overrides
Object.assign(Module, moduleOverrides);
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used.
moduleOverrides = null;
checkIncomingModuleAPI();

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.

if (Module['arguments']) arguments_ = Module['arguments'];legacyModuleProp('arguments', 'arguments_');

if (Module['thisProgram']) thisProgram = Module['thisProgram'];legacyModuleProp('thisProgram', 'thisProgram');

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
// Assertions on removed incoming Module JS APIs.
assert(typeof Module['memoryInitializerPrefixURL'] == 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['pthreadMainPrefixURL'] == 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['cdInitializerPrefixURL'] == 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['filePackagePrefixURL'] == 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['read'] == 'undefined', 'Module.read option was removed');
assert(typeof Module['readAsync'] == 'undefined', 'Module.readAsync option was removed (modify readAsync in JS)');
assert(typeof Module['readBinary'] == 'undefined', 'Module.readBinary option was removed (modify readBinary in JS)');
assert(typeof Module['setWindowTitle'] == 'undefined', 'Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)');
assert(typeof Module['TOTAL_MEMORY'] == 'undefined', 'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY');
legacyModuleProp('asm', 'wasmExports');
legacyModuleProp('readAsync', 'readAsync');
legacyModuleProp('readBinary', 'readBinary');
legacyModuleProp('setWindowTitle', 'setWindowTitle');
var IDBFS = 'IDBFS is no longer included by default; build with -lidbfs.js';
var PROXYFS = 'PROXYFS is no longer included by default; build with -lproxyfs.js';
var WORKERFS = 'WORKERFS is no longer included by default; build with -lworkerfs.js';
var FETCHFS = 'FETCHFS is no longer included by default; build with -lfetchfs.js';
var ICASEFS = 'ICASEFS is no longer included by default; build with -licasefs.js';
var JSFILEFS = 'JSFILEFS is no longer included by default; build with -ljsfilefs.js';
var OPFS = 'OPFS is no longer included by default; build with -lopfs.js';

var NODEFS = 'NODEFS is no longer included by default; build with -lnodefs.js';

assert(
  ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER || ENVIRONMENT_IS_NODE, 'Pthreads do not work in this environment yet (need Web Workers, or an alternative to them)');

assert(!ENVIRONMENT_IS_SHELL, 'shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.');

// end include: shell.js

// include: preamble.js
// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var wasmBinary = Module['wasmBinary'];legacyModuleProp('wasmBinary', 'wasmBinary');

if (typeof WebAssembly != 'object') {
  err('no native wasm support detected');
}

// Wasm globals

var wasmMemory;

// For sending to workers.
var wasmModule;

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

// In STRICT mode, we only define assert() when ASSERTIONS is set.  i.e. we
// don't define it at all in release modes.  This matches the behaviour of
// MINIMAL_RUNTIME.
// TODO(sbc): Make this the default even without STRICT enabled.
/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed' + (text ? ': ' + text : ''));
  }
}

// We used to include malloc/free by default in the past. Show a helpful error in
// builds with assertions.

// Memory management

var HEAP,
/** @type {!Int8Array} */
  HEAP8,
/** @type {!Uint8Array} */
  HEAPU8,
/** @type {!Int16Array} */
  HEAP16,
/** @type {!Uint16Array} */
  HEAPU16,
/** @type {!Int32Array} */
  HEAP32,
/** @type {!Uint32Array} */
  HEAPU32,
/** @type {!Float32Array} */
  HEAPF32,
/* BigInt64Array type is not correctly defined in closure
/** not-@type {!BigInt64Array} */
  HEAP64,
/* BigUint64Array type is not correctly defined in closure
/** not-t@type {!BigUint64Array} */
  HEAPU64,
/** @type {!Float64Array} */
  HEAPF64;

// include: runtime_shared.js
function updateMemoryViews() {
  var b = wasmMemory.buffer;
  Module['HEAP8'] = HEAP8 = new Int8Array(b);
  Module['HEAP16'] = HEAP16 = new Int16Array(b);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(b);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(b);
  Module['HEAP32'] = HEAP32 = new Int32Array(b);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(b);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(b);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(b);
  Module['HEAP64'] = HEAP64 = new BigInt64Array(b);
  Module['HEAPU64'] = HEAPU64 = new BigUint64Array(b);
}

// end include: runtime_shared.js
// include: runtime_pthread.js
// Pthread Web Worker handling code.
// This code runs only on pthread web workers and handles pthread setup
// and communication with the main thread via postMessage.

// Unique ID of the current pthread worker (zero on non-pthread-workers
// including the main thread).
var workerID = 0;

if (ENVIRONMENT_IS_PTHREAD) {
  var wasmModuleReceived;

  // Node.js support
  if (ENVIRONMENT_IS_NODE) {
    // Create as web-worker-like an environment as we can.

    var parentPort = worker_threads['parentPort'];
    parentPort.on('message', (msg) => onmessage({ data: msg }));

    Object.assign(globalThis, {
      self: global,
      postMessage: (msg) => parentPort.postMessage(msg),
    });
  }

  // Thread-local guard variable for one-time init of the JS state
  var initializedJS = false;

  function threadPrintErr(...args) {
    var text = args.join(' ');
    // See https://github.com/emscripten-core/emscripten/issues/14804
    if (ENVIRONMENT_IS_NODE) {
      fs.writeSync(2, text + '\n');
      return;
    }
    console.error(text);
  }

  if (!Module['printErr'])
    err = threadPrintErr;
  dbg = threadPrintErr;
  function threadAlert(...args) {
    var text = args.join(' ');
    postMessage({cmd: 'alert', text, threadId: _pthread_self()});
  }
  self.alert = threadAlert;

  // Turn unhandled rejected promises into errors so that the main thread will be
  // notified about them.
  self.onunhandledrejection = (e) => { throw e.reason || e; };

   function handleMessage(e) {
    try {
      var msgData = e['data'];
      //dbg('msgData: ' + Object.keys(msgData));
      var cmd = msgData.cmd;
      if (cmd === 'load') { // Preload command that is called once per worker to parse and load the Emscripten code.
        workerID = msgData.workerID;

        // Until we initialize the runtime, queue up any further incoming messages.
        let messageQueue = [];
        self.onmessage = (e) => messageQueue.push(e);

        // And add a callback for when the runtime is initialized.
        self.startWorker = (instance) => {
          // Notify the main thread that this thread has loaded.
          postMessage({ cmd: 'loaded' });
          // Process any messages that were queued before the thread was ready.
          for (let msg of messageQueue) {
            handleMessage(msg);
          }
          // Restore the real message handler.
          self.onmessage = handleMessage;
        };

        // Use `const` here to ensure that the variable is scoped only to
        // that iteration, allowing safe reference from a closure.
        for (const handler of msgData.handlers) {
          // The the main module has a handler for a certain even, but no
          // handler exists on the pthread worker, then proxy that handler
          // back to the main thread.
          if (!Module[handler] || Module[handler].proxy) {
            Module[handler] = (...args) => {
              postMessage({ cmd: 'callHandler', handler, args: args });
            }
            // Rebind the out / err handlers if needed
            if (handler == 'print') out = Module[handler];
            if (handler == 'printErr') err = Module[handler];
          }
        }

        wasmMemory = msgData.wasmMemory;
        updateMemoryViews();

        wasmModuleReceived(msgData.wasmModule);
      } else if (cmd === 'run') {
        assert(msgData.pthread_ptr);
        // Call inside JS module to set up the stack frame for this pthread in JS module scope.
        // This needs to be the first thing that we do, as we cannot call to any C/C++ functions
        // until the thread stack is initialized.
        establishStackSpace(msgData.pthread_ptr);

        // Pass the thread address to wasm to store it for fast access.
        __emscripten_thread_init(msgData.pthread_ptr, /*is_main=*/0, /*is_runtime=*/0, /*can_block=*/1, 0, 0);

        PThread.receiveObjectTransfer(msgData);
        PThread.threadInitTLS();

        // Await mailbox notifications with `Atomics.waitAsync` so we can start
        // using the fast `Atomics.notify` notification path.
        __emscripten_thread_mailbox_await(msgData.pthread_ptr);

        if (!initializedJS) {
          initializedJS = true;
        }

        try {
           invokeEntryPoint(msgData.start_routine, msgData.arg);
        } catch(ex) {
          if (ex != 'unwind') {
            // The pthread "crashed".  Do not call `_emscripten_thread_exit` (which
            // would make this thread joinable).  Instead, re-throw the exception
            // and let the top level handler propagate it back to the main thread.
            throw ex;
          }
        }
      } else if (msgData.target === 'setimmediate') {
        // no-op
      } else if (cmd === 'checkMailbox') {
        if (initializedJS) {
          checkMailbox();
        }
      } else if (cmd) {
        // The received message looks like something that should be handled by this message
        // handler, (since there is a cmd field present), but is not one of the
        // recognized commands:
        err(`worker: received unknown command ${cmd}`);
        err(msgData);
      }
    } catch(ex) {
      err(`worker: onmessage() captured an uncaught exception: ${ex}`);
      if (ex?.stack) err(ex.stack);
      __emscripten_thread_crashed();
      throw ex;
    }
  };

  self.onmessage = handleMessage;

} // ENVIRONMENT_IS_PTHREAD
// end include: runtime_pthread.js
assert(!Module['STACK_SIZE'], 'STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time')

assert(typeof Int32Array != 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray != undefined && Int32Array.prototype.set != undefined,
       'JS engine does not provide full typed array support');

// In non-standalone/normal mode, we create the memory here.
// include: runtime_init_memory.js
// Create the wasm memory. (Note: this only applies if IMPORTED_MEMORY is defined)

// check for full engine support (use string 'subarray' to avoid closure compiler confusion)

if (!ENVIRONMENT_IS_PTHREAD) {

  if (Module['wasmMemory']) {
    wasmMemory = Module['wasmMemory'];
  } else
  {
    var INITIAL_MEMORY = Module['INITIAL_MEMORY'] || 2147483648;legacyModuleProp('INITIAL_MEMORY', 'INITIAL_MEMORY');

    assert(INITIAL_MEMORY >= 20971520, 'INITIAL_MEMORY should be larger than STACK_SIZE, was ' + INITIAL_MEMORY + '! (STACK_SIZE=' + 20971520 + ')');
    /** @suppress {checkTypes} */
    wasmMemory = new WebAssembly.Memory({
      'initial': INITIAL_MEMORY / 65536,
      'maximum': INITIAL_MEMORY / 65536,
      'shared': true,
    });
  }

  updateMemoryViews();
}

// end include: runtime_init_memory.js

// include: runtime_stack_check.js
// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  var max = _emscripten_stack_get_end();
  assert((max & 3) == 0);
  // If the stack ends at address zero we write our cookies 4 bytes into the
  // stack.  This prevents interference with SAFE_HEAP and ASAN which also
  // monitor writes to address zero.
  if (max == 0) {
    max += 4;
  }
  // The stack grow downwards towards _emscripten_stack_get_end.
  // We write cookies to the final two words in the stack and detect if they are
  // ever overwritten.
  HEAPU32[((max)>>2)] = 0x02135467;
  HEAPU32[(((max)+(4))>>2)] = 0x89BACDFE;
  // Also test the global address 0 for integrity.
  HEAPU32[((0)>>2)] = 1668509029;
}

function checkStackCookie() {
  if (ABORT) return;
  var max = _emscripten_stack_get_end();
  // See writeStackCookie().
  if (max == 0) {
    max += 4;
  }
  var cookie1 = HEAPU32[((max)>>2)];
  var cookie2 = HEAPU32[(((max)+(4))>>2)];
  if (cookie1 != 0x02135467 || cookie2 != 0x89BACDFE) {
    abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
  }
  // Also test the global address 0 for integrity.
  if (HEAPU32[((0)>>2)] != 0x63736d65 /* 'emsc' */) {
    abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
  }
}
// end include: runtime_stack_check.js
var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;

function preRun() {
  assert(!ENVIRONMENT_IS_PTHREAD); // PThreads reuse the runtime from the main thread.
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  assert(!runtimeInitialized);
  runtimeInitialized = true;

  if (ENVIRONMENT_IS_PTHREAD) return;

  checkStackCookie();

  
if (!Module['noFSInit'] && !FS.initialized)
  FS.init();
FS.ignorePermissions = false;

TTY.init();
  callRuntimeCallbacks(__ATINIT__);
}

function postRun() {
  checkStackCookie();
  if (ENVIRONMENT_IS_PTHREAD) return; // PThreads reuse the runtime from the main thread.

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnExit(cb) {
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

// include: runtime_math.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc

assert(Math.imul, 'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.fround, 'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.clz32, 'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.trunc, 'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
// end include: runtime_math.js
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
}

function addRunDependency(id) {
  runDependencies++;

  Module['monitorRunDependencies']?.(runDependencies);

  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval != 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(() => {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err('still waiting on run dependencies:');
          }
          err(`dependency: ${dep}`);
        }
        if (shown) {
          err('(end of list)');
        }
      }, 10000);
    }
  } else {
    err('warning: run dependency added without ID');
  }
}

function removeRunDependency(id) {
  runDependencies--;

  Module['monitorRunDependencies']?.(runDependencies);

  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

/** @param {string|number=} what */
function abort(what) {
  Module['onAbort']?.(what);

  what = 'Aborted(' + what + ')';
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);

  ABORT = true;

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  // FIXME This approach does not work in Wasm EH because it currently does not assume
  // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
  // a trap or not based on a hidden field within the object. So at the moment
  // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
  // allows this in the wasm spec.

  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // definition for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
  /** @suppress {checkTypes} */
  var e = new WebAssembly.RuntimeError(what);

  readyPromiseReject(e);
  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

// include: memoryprofiler.js
// end include: memoryprofiler.js
// include: URIUtils.js
// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

/**
 * Indicates whether filename is a base64 data URI.
 * @noinline
 */
var isDataURI = (filename) => filename.startsWith(dataURIPrefix);

/**
 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
 * @noinline
 */
var isFileURI = (filename) => filename.startsWith('file://');
// end include: URIUtils.js
function createExportWrapper(name, nargs) {
  return (...args) => {
    assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
    var f = wasmExports[name];
    assert(f, `exported native function \`${name}\` not found`);
    // Only assert for too many arguments. Too few can be valid since the missing arguments will be zero filled.
    assert(args.length <= nargs, `native function \`${name}\` called with ${args.length} args but expects ${nargs}`);
    return f(...args);
  };
}

// include: runtime_exceptions.js
// Base Emscripten EH error class
class EmscriptenEH extends Error {}

class EmscriptenSjLj extends EmscriptenEH {}

class CppException extends EmscriptenEH {
  constructor(excPtr) {
    super(excPtr);
    this.excPtr = excPtr;
    const excInfo = getExceptionMessage(excPtr);
    this.name = excInfo[0];
    this.message = excInfo[1];
  }
}
// end include: runtime_exceptions.js
function findWasmBinary() {
    var f = 'z3-built.wasm';
    if (!isDataURI(f)) {
      return locateFile(f);
    }
    return f;
}

var wasmBinaryFile;

function getBinarySync(file) {
  if (file == wasmBinaryFile && wasmBinary) {
    return new Uint8Array(wasmBinary);
  }
  if (readBinary) {
    return readBinary(file);
  }
  throw 'both async and sync fetching of the wasm failed';
}

function getBinaryPromise(binaryFile) {
  // If we don't have the binary yet, load it asynchronously using readAsync.
  if (!wasmBinary
      ) {
    // Fetch the binary using readAsync
    return readAsync(binaryFile).then(
      (response) => new Uint8Array(/** @type{!ArrayBuffer} */(response)),
      // Fall back to getBinarySync if readAsync fails
      () => getBinarySync(binaryFile)
    );
  }

  // Otherwise, getBinarySync should be able to get it synchronously
  return Promise.resolve().then(() => getBinarySync(binaryFile));
}

function instantiateArrayBuffer(binaryFile, imports, receiver) {
  return getBinaryPromise(binaryFile).then((binary) => {
    return WebAssembly.instantiate(binary, imports);
  }).then(receiver, (reason) => {
    err(`failed to asynchronously prepare wasm: ${reason}`);

    // Warn on some common problems.
    if (isFileURI(wasmBinaryFile)) {
      err(`warning: Loading from a file URI (${wasmBinaryFile}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
    }
    abort(reason);
  });
}

function instantiateAsync(binary, binaryFile, imports, callback) {
  if (!binary &&
      typeof WebAssembly.instantiateStreaming == 'function' &&
      !isDataURI(binaryFile) &&
      // Don't use streaming for file:// delivered objects in a webview, fetch them synchronously.
      !isFileURI(binaryFile) &&
      // Avoid instantiateStreaming() on Node.js environment for now, as while
      // Node.js v18.1.0 implements it, it does not have a full fetch()
      // implementation yet.
      //
      // Reference:
      //   https://github.com/emscripten-core/emscripten/pull/16917
      !ENVIRONMENT_IS_NODE &&
      typeof fetch == 'function') {
    return fetch(binaryFile, { credentials: 'same-origin' }).then((response) => {
      // Suppress closure warning here since the upstream definition for
      // instantiateStreaming only allows Promise<Repsponse> rather than
      // an actual Response.
      // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure is fixed.
      /** @suppress {checkTypes} */
      var result = WebAssembly.instantiateStreaming(response, imports);

      return result.then(
        callback,
        function(reason) {
          // We expect the most common failure cause to be a bad MIME type for the binary,
          // in which case falling back to ArrayBuffer instantiation should work.
          err(`wasm streaming compile failed: ${reason}`);
          err('falling back to ArrayBuffer instantiation');
          return instantiateArrayBuffer(binaryFile, imports, callback);
        });
    });
  }
  return instantiateArrayBuffer(binaryFile, imports, callback);
}

function getWasmImports() {
  assignWasmImports();
  // prepare imports
  return {
    'env': wasmImports,
    'wasi_snapshot_preview1': wasmImports,
  }
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    wasmExports = instance.exports;

    

    registerTLSInit(wasmExports['_emscripten_tls_init']);

    wasmTable = wasmExports['__indirect_function_table'];
    
    assert(wasmTable, 'table not found in wasm exports');

    addOnInit(wasmExports['__wasm_call_ctors']);

    // We now have the Wasm module loaded up, keep a reference to the compiled module so we can post it to the workers.
    wasmModule = module;
    removeRunDependency('wasm-instantiate');
    return wasmExports;
  }
  // wait for the pthread pool (if any)
  addRunDependency('wasm-instantiate');

  // Prefer streaming instantiation if available.
  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
    trueModule = null;
    receiveInstance(result['instance'], result['module']);
  }

  var info = getWasmImports();

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to
  // run the instantiation parallel to any other async startup actions they are
  // performing.
  // Also pthreads and wasm workers initialize the wasm instance through this
  // path.
  if (Module['instantiateWasm']) {
    try {
      return Module['instantiateWasm'](info, receiveInstance);
    } catch(e) {
      err(`Module.instantiateWasm callback failed with error: ${e}`);
        // If instantiation fails, reject the module ready promise.
        readyPromiseReject(e);
    }
  }

  if (ENVIRONMENT_IS_PTHREAD) {
    return new Promise((resolve) => {
      wasmModuleReceived = (module) => {
        // Instantiate from the module posted from the main thread.
        // We can just use sync instantiation in the worker.
        var instance = new WebAssembly.Instance(module, getWasmImports());
        receiveInstance(instance, module);
        resolve();
      };
    });
  }

  wasmBinaryFile ??= findWasmBinary();

  // If instantiation fails, reject the module ready promise.
  instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).catch(readyPromiseReject);
  return {}; // no exports yet; we'll fill them in later
}

// include: runtime_debug.js
// Endianness check
(() => {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 0x6373;
  if (h8[0] !== 0x73 || h8[1] !== 0x63) throw 'Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)';
})();

if (Module['ENVIRONMENT']) {
  throw new Error('Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)');
}

function legacyModuleProp(prop, newName, incoming=true) {
  if (!Object.getOwnPropertyDescriptor(Module, prop)) {
    Object.defineProperty(Module, prop, {
      configurable: true,
      get() {
        let extra = incoming ? ' (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)' : '';
        abort(`\`Module.${prop}\` has been replaced by \`${newName}\`` + extra);

      }
    });
  }
}

function ignoredModuleProp(prop) {
  if (Object.getOwnPropertyDescriptor(Module, prop)) {
    abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`);
  }
}

// forcing the filesystem exports a few things by default
function isExportedByForceFilesystem(name) {
  return name === 'FS_createPath' ||
         name === 'FS_createDataFile' ||
         name === 'FS_createPreloadedFile' ||
         name === 'FS_unlink' ||
         name === 'addRunDependency' ||
         // The old FS has some functionality that WasmFS lacks.
         name === 'FS_createLazyFile' ||
         name === 'FS_createDevice' ||
         name === 'removeRunDependency';
}

/**
 * Intercept access to a global symbol.  This enables us to give informative
 * warnings/errors when folks attempt to use symbols they did not include in
 * their build, or no symbols that no longer exist.
 */
function hookGlobalSymbolAccess(sym, func) {
  // In MODULARIZE mode the generated code runs inside a function scope and not
  // the global scope, and JavaScript does not provide access to function scopes
  // so we cannot dynamically modify the scrope using `defineProperty` in this
  // case.
  //
  // In this mode we simply ignore requests for `hookGlobalSymbolAccess`. Since
  // this is a debug-only feature, skipping it is not major issue.
}

function missingGlobal(sym, msg) {
  hookGlobalSymbolAccess(sym, () => {
    warnOnce(`\`${sym}\` is not longer defined by emscripten. ${msg}`);
  });
}

missingGlobal('buffer', 'Please use HEAP8.buffer or wasmMemory.buffer');
missingGlobal('asm', 'Please use wasmExports instead');

function missingLibrarySymbol(sym) {
  hookGlobalSymbolAccess(sym, () => {
    // Can't `abort()` here because it would break code that does runtime
    // checks.  e.g. `if (typeof SDL === 'undefined')`.
    var msg = `\`${sym}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`;
    // DEFAULT_LIBRARY_FUNCS_TO_INCLUDE requires the name as it appears in
    // library.js, which means $name for a JS name with no prefix, or name
    // for a JS name like _name.
    var librarySymbol = sym;
    if (!librarySymbol.startsWith('_')) {
      librarySymbol = '$' + sym;
    }
    msg += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${librarySymbol}')`;
    if (isExportedByForceFilesystem(sym)) {
      msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
    }
    warnOnce(msg);
  });

  // Any symbol that is not included from the JS library is also (by definition)
  // not exported on the Module object.
  unexportedRuntimeSymbol(sym);
}

function unexportedRuntimeSymbol(sym) {
  if (ENVIRONMENT_IS_PTHREAD) {
    return;
  }
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Object.defineProperty(Module, sym, {
      configurable: true,
      get() {
        var msg = `'${sym}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
        if (isExportedByForceFilesystem(sym)) {
          msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
        }
        abort(msg);
      }
    });
  }
}

// Used by XXXXX_DEBUG settings to output debug messages.
function dbg(...args) {
  // Avoid using the console for debugging in multi-threaded node applications
  // See https://github.com/emscripten-core/emscripten/issues/14804
  if (ENVIRONMENT_IS_NODE && fs) {
    fs.writeSync(2, args.join(' ') + '\n');
  } else
  // TODO(sbc): Make this configurable somehow.  Its not always convenient for
  // logging to show up as warnings.
  console.warn(...args);
}
// end include: runtime_debug.js
// === Body ===

var ASM_CONSTS = {
  21442688: () => { threadTimeouts.push(setTimeout(() => {}, 600000)); },  
 21442743: ($0) => { resolve_async(UTF8ToString($0)); },  
 21442780: () => { reject_async(new Error('failed with unknown exception')); },  
 21442842: ($0) => { reject_async(new Error(UTF8ToString($0))); },  
 21442889: () => { clearTimeout(threadTimeouts.shift()); },  
 21442931: () => { threadTimeouts.push(setTimeout(() => {}, 600000)); },  
 21442986: ($0) => { resolve_async($0); },  
 21443009: () => { reject_async('failed with unknown exception'); },  
 21443060: ($0) => { reject_async(new Error(UTF8ToString($0))); },  
 21443107: () => { clearTimeout(threadTimeouts.shift()); },  
 21443149: () => { threadTimeouts.push(setTimeout(() => {}, 600000)); },  
 21443204: ($0) => { resolve_async($0); },  
 21443227: () => { reject_async('failed with unknown exception'); },  
 21443278: ($0) => { reject_async(new Error(UTF8ToString($0))); },  
 21443325: () => { clearTimeout(threadTimeouts.shift()); },  
 21443367: () => { threadTimeouts.push(setTimeout(() => {}, 600000)); },  
 21443422: ($0) => { resolve_async($0); },  
 21443445: () => { reject_async('failed with unknown exception'); },  
 21443496: ($0) => { reject_async(new Error(UTF8ToString($0))); },  
 21443543: () => { clearTimeout(threadTimeouts.shift()); },  
 21443585: () => { threadTimeouts.push(setTimeout(() => {}, 600000)); },  
 21443640: ($0) => { resolve_async($0); },  
 21443663: () => { reject_async('failed with unknown exception'); },  
 21443714: ($0) => { reject_async(new Error(UTF8ToString($0))); },  
 21443761: () => { clearTimeout(threadTimeouts.shift()); },  
 21443803: () => { threadTimeouts.push(setTimeout(() => {}, 600000)); },  
 21443858: ($0) => { resolve_async($0); },  
 21443881: () => { reject_async('failed with unknown exception'); },  
 21443932: ($0) => { reject_async(new Error(UTF8ToString($0))); },  
 21443979: () => { clearTimeout(threadTimeouts.shift()); },  
 21444021: () => { threadTimeouts.push(setTimeout(() => {}, 600000)); },  
 21444076: ($0) => { resolve_async($0); },  
 21444099: () => { reject_async('failed with unknown exception'); },  
 21444150: ($0) => { reject_async(new Error(UTF8ToString($0))); },  
 21444197: () => { clearTimeout(threadTimeouts.shift()); },  
 21444239: () => { threadTimeouts.push(setTimeout(() => {}, 600000)); },  
 21444294: ($0) => { resolve_async($0); },  
 21444317: () => { reject_async('failed with unknown exception'); },  
 21444368: ($0) => { reject_async(new Error(UTF8ToString($0))); },  
 21444415: () => { clearTimeout(threadTimeouts.shift()); },  
 21444457: () => { threadTimeouts.push(setTimeout(() => {}, 600000)); },  
 21444512: ($0) => { resolve_async($0); },  
 21444535: () => { reject_async('failed with unknown exception'); },  
 21444586: ($0) => { reject_async(new Error(UTF8ToString($0))); },  
 21444633: () => { clearTimeout(threadTimeouts.shift()); },  
 21444675: () => { threadTimeouts.push(setTimeout(() => {}, 600000)); },  
 21444730: ($0) => { resolve_async($0); },  
 21444753: () => { reject_async('failed with unknown exception'); },  
 21444804: ($0) => { reject_async(new Error(UTF8ToString($0))); },  
 21444851: () => { clearTimeout(threadTimeouts.shift()); },  
 21444893: () => { threadTimeouts.push(setTimeout(() => {}, 600000)); },  
 21444948: ($0) => { resolve_async($0); },  
 21444971: () => { reject_async('failed with unknown exception'); },  
 21445022: ($0) => { reject_async(new Error(UTF8ToString($0))); },  
 21445069: () => { clearTimeout(threadTimeouts.shift()); },  
 21445111: () => { threadTimeouts.push(setTimeout(() => {}, 600000)); },  
 21445166: ($0) => { resolve_async($0); },  
 21445189: () => { reject_async('failed with unknown exception'); },  
 21445240: ($0) => { reject_async(new Error(UTF8ToString($0))); },  
 21445287: () => { clearTimeout(threadTimeouts.shift()); },  
 21445329: () => { threadTimeouts.push(setTimeout(() => {}, 600000)); },  
 21445384: ($0) => { resolve_async($0); },  
 21445407: () => { reject_async('failed with unknown exception'); },  
 21445458: ($0) => { reject_async(new Error(UTF8ToString($0))); },  
 21445505: () => { clearTimeout(threadTimeouts.shift()); },  
 21445547: () => { threadTimeouts.push(setTimeout(() => {}, 600000)); },  
 21445602: ($0) => { resolve_async($0); },  
 21445625: () => { reject_async('failed with unknown exception'); },  
 21445676: ($0) => { reject_async(new Error(UTF8ToString($0))); },  
 21445723: () => { clearTimeout(threadTimeouts.shift()); },  
 21445765: () => { threadTimeouts.push(setTimeout(() => {}, 600000)); },  
 21445820: ($0) => { resolve_async($0); },  
 21445843: () => { reject_async('failed with unknown exception'); },  
 21445894: ($0) => { reject_async(new Error(UTF8ToString($0))); },  
 21445941: () => { clearTimeout(threadTimeouts.shift()); },  
 21445983: () => { threadTimeouts.push(setTimeout(() => {}, 600000)); },  
 21446038: ($0) => { resolve_async($0); },  
 21446061: () => { reject_async('failed with unknown exception'); },  
 21446112: ($0) => { reject_async(new Error(UTF8ToString($0))); },  
 21446159: () => { clearTimeout(threadTimeouts.shift()); }
};

// end include: preamble.js


  class ExitStatus {
      name = 'ExitStatus';
      constructor(status) {
        this.message = `Program terminated with exit(${status})`;
        this.status = status;
      }
    }

  
  var terminateWorker = (worker) => {
      worker.terminate();
      // terminate() can be asynchronous, so in theory the worker can continue
      // to run for some amount of time after termination.  However from our POV
      // the worker now dead and we don't want to hear from it again, so we stub
      // out its message handler here.  This avoids having to check in each of
      // the onmessage handlers if the message was coming from valid worker.
      worker.onmessage = (e) => {
        var cmd = e['data'].cmd;
        err(`received "${cmd}" command from terminated worker: ${worker.workerID}`);
      };
    };
  
  var cleanupThread = (pthread_ptr) => {
      assert(!ENVIRONMENT_IS_PTHREAD, 'Internal Error! cleanupThread() can only ever be called from main application thread!');
      assert(pthread_ptr, 'Internal Error! Null pthread_ptr in cleanupThread!');
      var worker = PThread.pthreads[pthread_ptr];
      assert(worker);
      PThread.returnWorkerToPool(worker);
    };
  
  var spawnThread = (threadParams) => {
      assert(!ENVIRONMENT_IS_PTHREAD, 'Internal Error! spawnThread() can only ever be called from main application thread!');
      assert(threadParams.pthread_ptr, 'Internal error, no pthread ptr!');
  
      var worker = PThread.getNewWorker();
      if (!worker) {
        // No available workers in the PThread pool.
        return 6;
      }
      assert(!worker.pthread_ptr, 'Internal error!');
  
      PThread.runningWorkers.push(worker);
  
      // Add to pthreads map
      PThread.pthreads[threadParams.pthread_ptr] = worker;
  
      worker.pthread_ptr = threadParams.pthread_ptr;
      var msg = {
          cmd: 'run',
          start_routine: threadParams.startRoutine,
          arg: threadParams.arg,
          pthread_ptr: threadParams.pthread_ptr,
      };
      if (ENVIRONMENT_IS_NODE) {
        // Mark worker as weakly referenced once we start executing a pthread,
        // so that its existence does not prevent Node.js from exiting.  This
        // has no effect if the worker is already weakly referenced (e.g. if
        // this worker was previously idle/unused).
        worker.unref();
      }
      // Ask the worker to start executing its pthread entry point function.
      worker.postMessage(msg, threadParams.transferList);
      return 0;
    };
  
  
  
  var runtimeKeepaliveCounter = 0;
  var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
  
  var stackSave = () => _emscripten_stack_get_current();
  
  var stackRestore = (val) => __emscripten_stack_restore(val);
  
  var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
  
  
  var INT53_MAX = 9007199254740992;
  
  var INT53_MIN = -9007199254740992;
  var bigintToI53Checked = (num) => (num < INT53_MIN || num > INT53_MAX) ? NaN : Number(num);
  
  /** @type{function(number, (number|boolean), ...number)} */
  var proxyToMainThread = (funcIndex, emAsmAddr, sync, ...callArgs) => {
      // EM_ASM proxying is done by passing a pointer to the address of the EM_ASM
      // content as `emAsmAddr`.  JS library proxying is done by passing an index
      // into `proxiedJSCallArgs` as `funcIndex`. If `emAsmAddr` is non-zero then
      // `funcIndex` will be ignored.
      // Additional arguments are passed after the first three are the actual
      // function arguments.
      // The serialization buffer contains the number of call params, and then
      // all the args here.
      // We also pass 'sync' to C separately, since C needs to look at it.
      // Allocate a buffer, which will be copied by the C code.
      //
      // First passed parameter specifies the number of arguments to the function.
      // When BigInt support is enabled, we must handle types in a more complex
      // way, detecting at runtime if a value is a BigInt or not (as we have no
      // type info here). To do that, add a "prefix" before each value that
      // indicates if it is a BigInt, which effectively doubles the number of
      // values we serialize for proxying. TODO: pack this?
      var serializedNumCallArgs = callArgs.length * 2;
      var sp = stackSave();
      var args = stackAlloc(serializedNumCallArgs * 8);
      var b = ((args)>>3);
      for (var i = 0; i < callArgs.length; i++) {
        var arg = callArgs[i];
        if (typeof arg == 'bigint') {
          // The prefix is non-zero to indicate a bigint.
          HEAP64[b + 2*i] = 1n;
          HEAP64[b + 2*i + 1] = arg;
        } else {
          // The prefix is zero to indicate a JS Number.
          HEAP64[b + 2*i] = 0n;
          HEAPF64[b + 2*i + 1] = arg;
        }
      }
      var rtn = __emscripten_run_on_main_thread_js(funcIndex, emAsmAddr, serializedNumCallArgs, args, sync);
      stackRestore(sp);
      return rtn;
    };
  
  function _proc_exit(code) {
  if (ENVIRONMENT_IS_PTHREAD)
    return proxyToMainThread(0, 0, 1, code);
  
      EXITSTATUS = code;
      if (!keepRuntimeAlive()) {
        PThread.terminateAllThreads();
        Module['onExit']?.(code);
        ABORT = true;
      }
      quit_(code, new ExitStatus(code));
    
  }
  
  
  
  
  var handleException = (e) => {
      // Certain exception types we do not treat as errors since they are used for
      // internal control flow.
      // 1. ExitStatus, which is thrown by exit()
      // 2. "unwind", which is thrown by emscripten_unwind_to_js_event_loop() and others
      //    that wish to return to JS event loop.
      if (e instanceof ExitStatus || e == 'unwind') {
        return EXITSTATUS;
      }
      checkStackCookie();
      if (e instanceof WebAssembly.RuntimeError) {
        if (_emscripten_stack_get_current() <= 0) {
          err('Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 20971520)');
        }
      }
      quit_(1, e);
    };
  
  
  
  function exitOnMainThread(returnCode) {
  if (ENVIRONMENT_IS_PTHREAD)
    return proxyToMainThread(1, 0, 0, returnCode);
  
      _exit(returnCode);
    
  }
  
  
  /** @suppress {duplicate } */
  /** @param {boolean|number=} implicit */
  var exitJS = (status, implicit) => {
      EXITSTATUS = status;
  
      checkUnflushedContent();
  
      if (ENVIRONMENT_IS_PTHREAD) {
        // implicit exit can never happen on a pthread
        assert(!implicit);
        // When running in a pthread we propagate the exit back to the main thread
        // where it can decide if the whole process should be shut down or not.
        // The pthread may have decided not to exit its own runtime, for example
        // because it runs a main loop, but that doesn't affect the main thread.
        exitOnMainThread(status);
        throw 'unwind';
      }
  
      // if exit() was called explicitly, warn the user if the runtime isn't actually being shut down
      if (keepRuntimeAlive() && !implicit) {
        var msg = `program exited (with status: ${status}), but keepRuntimeAlive() is set (counter=${runtimeKeepaliveCounter}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`;
        readyPromiseReject(msg);
        err(msg);
      }
  
      _proc_exit(status);
    };
  var _exit = exitJS;
  
  var ptrToString = (ptr) => {
      assert(typeof ptr === 'number');
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      ptr >>>= 0;
      return '0x' + ptr.toString(16).padStart(8, '0');
    };
  
  
  var PThread = {
  unusedWorkers:[],
  runningWorkers:[],
  tlsInitFunctions:[],
  pthreads:{
  },
  nextWorkerID:1,
  debugInit() {
        function pthreadLogPrefix() {
          var t = 0;
          if (runtimeInitialized && typeof _pthread_self != 'undefined'
          ) {
            t = _pthread_self();
          }
          return `w:${workerID},t:${ptrToString(t)}: `;
        }
  
        // Prefix all err()/dbg() messages with the calling thread ID.
        var origDbg = dbg;
        dbg = (...args) => origDbg(pthreadLogPrefix() + args.join(' '));
      },
  init() {
        PThread.debugInit();
        if ((!(ENVIRONMENT_IS_PTHREAD))) {
          PThread.initMainThread();
        }
      },
  initMainThread() {
        // MINIMAL_RUNTIME takes care of calling loadWasmModuleToAllWorkers
        // in postamble_minimal.js
        addOnPreRun(() => {
          addRunDependency('loading-workers')
          PThread.loadWasmModuleToAllWorkers(() => removeRunDependency('loading-workers'));
        });
      },
  terminateAllThreads:() => {
        assert(!ENVIRONMENT_IS_PTHREAD, 'Internal Error! terminateAllThreads() can only ever be called from main application thread!');
        // Attempt to kill all workers.  Sadly (at least on the web) there is no
        // way to terminate a worker synchronously, or to be notified when a
        // worker in actually terminated.  This means there is some risk that
        // pthreads will continue to be executing after `worker.terminate` has
        // returned.  For this reason, we don't call `returnWorkerToPool` here or
        // free the underlying pthread data structures.
        for (var worker of PThread.runningWorkers) {
          terminateWorker(worker);
        }
        for (var worker of PThread.unusedWorkers) {
          terminateWorker(worker);
        }
        PThread.unusedWorkers = [];
        PThread.runningWorkers = [];
        PThread.pthreads = {};
      },
  returnWorkerToPool:(worker) => {
        // We don't want to run main thread queued calls here, since we are doing
        // some operations that leave the worker queue in an invalid state until
        // we are completely done (it would be bad if free() ends up calling a
        // queued pthread_create which looks at the global data structures we are
        // modifying). To achieve that, defer the free() til the very end, when
        // we are all done.
        var pthread_ptr = worker.pthread_ptr;
        delete PThread.pthreads[pthread_ptr];
        // Note: worker is intentionally not terminated so the pool can
        // dynamically grow.
        PThread.unusedWorkers.push(worker);
        PThread.runningWorkers.splice(PThread.runningWorkers.indexOf(worker), 1);
        // Not a running Worker anymore
        // Detach the worker from the pthread object, and return it to the
        // worker pool as an unused worker.
        worker.pthread_ptr = 0;
  
        // Finally, free the underlying (and now-unused) pthread structure in
        // linear memory.
        __emscripten_thread_free_data(pthread_ptr);
      },
  receiveObjectTransfer(data) {
      },
  threadInitTLS() {
        // Call thread init functions (these are the _emscripten_tls_init for each
        // module loaded.
        PThread.tlsInitFunctions.forEach((f) => f());
      },
  loadWasmModuleToWorker:(worker) => new Promise((onFinishedLoading) => {
        worker.onmessage = (e) => {
          var d = e['data'];
          var cmd = d.cmd;
  
          // If this message is intended to a recipient that is not the main
          // thread, forward it to the target thread.
          if (d.targetThread && d.targetThread != _pthread_self()) {
            var targetWorker = PThread.pthreads[d.targetThread];
            if (targetWorker) {
              targetWorker.postMessage(d, d.transferList);
            } else {
              err(`Internal error! Worker sent a message "${cmd}" to target pthread ${d.targetThread}, but that thread no longer exists!`);
            }
            return;
          }
  
          if (cmd === 'checkMailbox') {
            checkMailbox();
          } else if (cmd === 'spawnThread') {
            spawnThread(d);
          } else if (cmd === 'cleanupThread') {
            cleanupThread(d.thread);
          } else if (cmd === 'loaded') {
            worker.loaded = true;
            onFinishedLoading(worker);
          } else if (cmd === 'alert') {
            alert(`Thread ${d.threadId}: ${d.text}`);
          } else if (d.target === 'setimmediate') {
            // Worker wants to postMessage() to itself to implement setImmediate()
            // emulation.
            worker.postMessage(d);
          } else if (cmd === 'callHandler') {
            Module[d.handler](...d.args);
          } else if (cmd) {
            // The received message looks like something that should be handled by this message
            // handler, (since there is a e.data.cmd field present), but is not one of the
            // recognized commands:
            err(`worker sent an unknown command ${cmd}`);
          }
        };
  
        worker.onerror = (e) => {
          var message = 'worker sent an error!';
          if (worker.pthread_ptr) {
            message = `Pthread ${ptrToString(worker.pthread_ptr)} sent an error!`;
          }
          err(`${message} ${e.filename}:${e.lineno}: ${e.message}`);
          throw e;
        };
  
        if (ENVIRONMENT_IS_NODE) {
          worker.on('message', (data) => worker.onmessage({ data: data }));
          worker.on('error', (e) => worker.onerror(e));
        }
  
        assert(wasmMemory instanceof WebAssembly.Memory, 'WebAssembly memory should have been loaded by now!');
        assert(wasmModule instanceof WebAssembly.Module, 'WebAssembly Module should have been loaded by now!');
  
        // When running on a pthread, none of the incoming parameters on the module
        // object are present. Proxy known handlers back to the main thread if specified.
        var handlers = [];
        var knownHandlers = [
          'onExit',
          'onAbort',
          'print',
          'printErr',
        ];
        for (var handler of knownHandlers) {
          if (Module.propertyIsEnumerable(handler)) {
            handlers.push(handler);
          }
        }
  
        worker.workerID = PThread.nextWorkerID++;
  
        // Ask the new worker to load up the Emscripten-compiled page. This is a heavy operation.
        worker.postMessage({
          cmd: 'load',
          handlers: handlers,
          wasmMemory,
          wasmModule,
          'workerID': worker.workerID,
        });
      }),
  loadWasmModuleToAllWorkers(onMaybeReady) {
        onMaybeReady();
      },
  allocateUnusedWorker() {
        var worker;
        var workerOptions = {
          // This is the way that we signal to the node worker that it is hosting
          // a pthread.
          'workerData': 'em-pthread',
          // This is the way that we signal to the Web Worker that it is hosting
          // a pthread.
          'name': 'em-pthread-' + PThread.nextWorkerID,
        };
        var pthreadMainJs = _scriptName;
        // We can't use makeModuleReceiveWithVar here since we want to also
        // call URL.createObjectURL on the mainScriptUrlOrBlob.
        if (Module['mainScriptUrlOrBlob']) {
          pthreadMainJs = Module['mainScriptUrlOrBlob'];
          if (typeof pthreadMainJs != 'string') {
            pthreadMainJs = URL.createObjectURL(pthreadMainJs);
          }
        }
        worker = new Worker(pthreadMainJs, workerOptions);
        PThread.unusedWorkers.push(worker);
      },
  getNewWorker() {
        if (PThread.unusedWorkers.length == 0) {
  // PTHREAD_POOL_SIZE_STRICT should show a warning and, if set to level `2`, return from the function.
          PThread.allocateUnusedWorker();
          PThread.loadWasmModuleToWorker(PThread.unusedWorkers[0]);
        }
        return PThread.unusedWorkers.pop();
      },
  };

  var callRuntimeCallbacks = (callbacks) => {
      while (callbacks.length > 0) {
        // Pass the module as the first argument.
        callbacks.shift()(Module);
      }
    };

  
  var establishStackSpace = (pthread_ptr) => {
      var stackHigh = HEAPU32[(((pthread_ptr)+(52))>>2)];
      var stackSize = HEAPU32[(((pthread_ptr)+(56))>>2)];
      var stackLow = stackHigh - stackSize;
      assert(stackHigh != 0);
      assert(stackLow != 0);
      assert(stackHigh > stackLow, 'stackHigh must be higher then stackLow');
      // Set stack limits used by `emscripten/stack.h` function.  These limits are
      // cached in wasm-side globals to make checks as fast as possible.
      _emscripten_stack_set_limits(stackHigh, stackLow);
  
      // Call inside wasm module to set up the stack frame for this pthread in wasm module scope
      stackRestore(stackHigh);
  
      // Write the stack cookie last, after we have set up the proper bounds and
      // current position of the stack.
      writeStackCookie();
    };

  
    /**
     * @param {number} ptr
     * @param {string} type
     */
  function getValue(ptr, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': return HEAP8[ptr];
      case 'i8': return HEAP8[ptr];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP64[((ptr)>>3)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      case '*': return HEAPU32[((ptr)>>2)];
      default: abort(`invalid type for getValue: ${type}`);
    }
  }

  
  
  
  
  var wasmTableMirror = [];
  
  /** @type {WebAssembly.Table} */
  var wasmTable;
  var getWasmTableEntry = (funcPtr) => {
      var func = wasmTableMirror[funcPtr];
      if (!func) {
        if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
        /** @suppress {checkTypes} */
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
      }
      /** @suppress {checkTypes} */
      assert(wasmTable.get(funcPtr) == func, 'JavaScript-side Wasm function table mirror is out of date!');
      return func;
    };
  var invokeEntryPoint = (ptr, arg) => {
      // An old thread on this worker may have been canceled without returning the
      // `runtimeKeepaliveCounter` to zero. Reset it now so the new thread won't
      // be affected.
      runtimeKeepaliveCounter = 0;
  
      // Same for noExitRuntime.  The default for pthreads should always be false
      // otherwise pthreads would never complete and attempts to pthread_join to
      // them would block forever.
      // pthreads can still choose to set `noExitRuntime` explicitly, or
      // call emscripten_unwind_to_js_event_loop to extend their lifetime beyond
      // their main function.  See comment in src/runtime_pthread.js for more.
      noExitRuntime = 0;
  
      // pthread entry points are always of signature 'void *ThreadMain(void *arg)'
      // Native codebases sometimes spawn threads with other thread entry point
      // signatures, such as void ThreadMain(void *arg), void *ThreadMain(), or
      // void ThreadMain().  That is not acceptable per C/C++ specification, but
      // x86 compiler ABI extensions enable that to work. If you find the
      // following line to crash, either change the signature to "proper" void
      // *ThreadMain(void *arg) form, or try linking with the Emscripten linker
      // flag -sEMULATE_FUNCTION_POINTER_CASTS to add in emulation for this x86
      // ABI extension.
  
      var result = getWasmTableEntry(ptr)(arg);
  
      checkStackCookie();
      function finish(result) {
        if (keepRuntimeAlive()) {
          EXITSTATUS = result;
        } else {
          __emscripten_thread_exit(result);
        }
      }
      finish(result);
    };

  var noExitRuntime = Module['noExitRuntime'] || true;


  var registerTLSInit = (tlsInitFunc) => PThread.tlsInitFunctions.push(tlsInitFunc);

  
    /**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */
  function setValue(ptr, value, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': HEAP8[ptr] = value; break;
      case 'i8': HEAP8[ptr] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': HEAP64[((ptr)>>3)] = BigInt(value); break;
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
      case 'double': HEAPF64[((ptr)>>3)] = value; break;
      case '*': HEAPU32[((ptr)>>2)] = value; break;
      default: abort(`invalid type for setValue: ${type}`);
    }
  }



  var warnOnce = (text) => {
      warnOnce.shown ||= {};
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        if (ENVIRONMENT_IS_NODE) text = 'warning: ' + text;
        err(text);
      }
    };

  var UTF8Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder() : undefined;
  
    /**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number=} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */
  var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead = NaN) => {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      // TextDecoder needs to know the byte length in advance, it doesn't stop on
      // null terminator by itself.  Also, use the length info to avoid running tiny
      // strings through TextDecoder, since .subarray() allocates garbage.
      // (As a tiny code save trick, compare endPtr against endIdx using a negation,
      // so that undefined/NaN means Infinity)
      while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
  
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.buffer instanceof ArrayBuffer ? heapOrArray.subarray(idx, endPtr) : heapOrArray.slice(idx, endPtr));
      }
      var str = '';
      // If building with TextDecoder, we have already computed the string length
      // above, so test loop end condition against that
      while (idx < endPtr) {
        // For UTF8 byte structure, see:
        // http://en.wikipedia.org/wiki/UTF-8#Description
        // https://www.ietf.org/rfc/rfc2279.txt
        // https://tools.ietf.org/html/rfc3629
        var u0 = heapOrArray[idx++];
        if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 0xF0) == 0xE0) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte ' + ptrToString(u0) + ' encountered when deserializing a UTF-8 string in wasm memory to a JS string!');
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
        }
  
        if (u0 < 0x10000) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        }
      }
      return str;
    };
  
    /**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index (i.e. maxBytesToRead will not
     *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
     *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
     *   JS JIT optimizations off, so it is worth to consider consistently using one
     * @return {string}
     */
  var UTF8ToString = (ptr, maxBytesToRead) => {
      assert(typeof ptr == 'number', `UTF8ToString expects a number (got ${typeof ptr})`);
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
    };
  var ___assert_fail = (condition, filename, line, func) =>
      abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [filename ? UTF8ToString(filename) : 'unknown filename', line, func ? UTF8ToString(func) : 'unknown function']);

  var ___call_sighandler = (fp, sig) => getWasmTableEntry(fp)(sig);

  var exceptionCaught =  [];
  
  
  
  var uncaughtExceptionCount = 0;
  var ___cxa_begin_catch = (ptr) => {
      var info = new ExceptionInfo(ptr);
      if (!info.get_caught()) {
        info.set_caught(true);
        uncaughtExceptionCount--;
      }
      info.set_rethrown(false);
      exceptionCaught.push(info);
      ___cxa_increment_exception_refcount(ptr);
      return ___cxa_get_exception_ptr(ptr);
    };

  
  var exceptionLast = 0;
  
  
  var ___cxa_end_catch = () => {
      // Clear state flag.
      _setThrew(0, 0);
      assert(exceptionCaught.length > 0);
      // Call destructor if one is registered then clear it.
      var info = exceptionCaught.pop();
  
      ___cxa_decrement_exception_refcount(info.excPtr);
      exceptionLast = 0; // XXX in decRef?
    };

  
  class ExceptionInfo {
      // excPtr - Thrown object pointer to wrap. Metadata pointer is calculated from it.
      constructor(excPtr) {
        this.excPtr = excPtr;
        this.ptr = excPtr - 24;
      }
  
      set_type(type) {
        HEAPU32[(((this.ptr)+(4))>>2)] = type;
      }
  
      get_type() {
        return HEAPU32[(((this.ptr)+(4))>>2)];
      }
  
      set_destructor(destructor) {
        HEAPU32[(((this.ptr)+(8))>>2)] = destructor;
      }
  
      get_destructor() {
        return HEAPU32[(((this.ptr)+(8))>>2)];
      }
  
      set_caught(caught) {
        caught = caught ? 1 : 0;
        HEAP8[(this.ptr)+(12)] = caught;
      }
  
      get_caught() {
        return HEAP8[(this.ptr)+(12)] != 0;
      }
  
      set_rethrown(rethrown) {
        rethrown = rethrown ? 1 : 0;
        HEAP8[(this.ptr)+(13)] = rethrown;
      }
  
      get_rethrown() {
        return HEAP8[(this.ptr)+(13)] != 0;
      }
  
      // Initialize native structure fields. Should be called once after allocated.
      init(type, destructor) {
        this.set_adjusted_ptr(0);
        this.set_type(type);
        this.set_destructor(destructor);
      }
  
      set_adjusted_ptr(adjustedPtr) {
        HEAPU32[(((this.ptr)+(16))>>2)] = adjustedPtr;
      }
  
      get_adjusted_ptr() {
        return HEAPU32[(((this.ptr)+(16))>>2)];
      }
    }
  
  var ___resumeException = (ptr) => {
      if (!exceptionLast) {
        exceptionLast = new CppException(ptr);
      }
      throw exceptionLast;
    };
  
  
  var setTempRet0 = (val) => __emscripten_tempret_set(val);
  var findMatchingCatch = (args) => {
      var thrown =
        exceptionLast?.excPtr;
      if (!thrown) {
        // just pass through the null ptr
        setTempRet0(0);
        return 0;
      }
      var info = new ExceptionInfo(thrown);
      info.set_adjusted_ptr(thrown);
      var thrownType = info.get_type();
      if (!thrownType) {
        // just pass through the thrown ptr
        setTempRet0(0);
        return thrown;
      }
  
      // can_catch receives a **, add indirection
      // The different catch blocks are denoted by different types.
      // Due to inheritance, those types may not precisely match the
      // type of the thrown object. Find one which matches, and
      // return the type of the catch block which should be called.
      for (var caughtType of args) {
        if (caughtType === 0 || caughtType === thrownType) {
          // Catch all clause matched or exactly the same type is caught
          break;
        }
        var adjusted_ptr_addr = info.ptr + 16;
        if (___cxa_can_catch(caughtType, thrownType, adjusted_ptr_addr)) {
          setTempRet0(caughtType);
          return thrown;
        }
      }
      setTempRet0(thrownType);
      return thrown;
    };
  var ___cxa_find_matching_catch_2 = () => findMatchingCatch([]);

  var ___cxa_find_matching_catch_3 = (arg0) => findMatchingCatch([arg0]);

  var ___cxa_find_matching_catch_4 = (arg0,arg1) => findMatchingCatch([arg0,arg1]);

  var ___cxa_find_matching_catch_7 = (arg0,arg1,arg2,arg3,arg4) => findMatchingCatch([arg0,arg1,arg2,arg3,arg4]);

  var ___cxa_find_matching_catch_8 = (arg0,arg1,arg2,arg3,arg4,arg5) => findMatchingCatch([arg0,arg1,arg2,arg3,arg4,arg5]);

  
  
  var ___cxa_rethrow = () => {
      var info = exceptionCaught.pop();
      if (!info) {
        abort('no exception to throw');
      }
      var ptr = info.excPtr;
      if (!info.get_rethrown()) {
        // Only pop if the corresponding push was through rethrow_primary_exception
        exceptionCaught.push(info);
        info.set_rethrown(true);
        info.set_caught(false);
        uncaughtExceptionCount++;
      }
      exceptionLast = new CppException(ptr);
      throw exceptionLast;
    };

  
  
  var ___cxa_throw = (ptr, type, destructor) => {
      var info = new ExceptionInfo(ptr);
      // Initialize ExceptionInfo content after it was allocated in __cxa_allocate_exception.
      info.init(type, destructor);
      exceptionLast = new CppException(ptr);
      uncaughtExceptionCount++;
      throw exceptionLast;
    };

  var ___cxa_uncaught_exceptions = () => uncaughtExceptionCount;

  
  
  
  
  
  function pthreadCreateProxied(pthread_ptr, attr, startRoutine, arg) {
  if (ENVIRONMENT_IS_PTHREAD)
    return proxyToMainThread(2, 0, 1, pthread_ptr, attr, startRoutine, arg);
  return ___pthread_create_js(pthread_ptr, attr, startRoutine, arg)
  }
  
  
  var _emscripten_has_threading_support = () => typeof SharedArrayBuffer != 'undefined';
  
  var ___pthread_create_js = (pthread_ptr, attr, startRoutine, arg) => {
      if (!_emscripten_has_threading_support()) {
        dbg('pthread_create: environment does not support SharedArrayBuffer, pthreads are not available');
        return 6;
      }
  
      // List of JS objects that will transfer ownership to the Worker hosting the thread
      var transferList = [];
      var error = 0;
  
      // Synchronously proxy the thread creation to main thread if possible. If we
      // need to transfer ownership of objects, then proxy asynchronously via
      // postMessage.
      if (ENVIRONMENT_IS_PTHREAD && (transferList.length === 0 || error)) {
        return pthreadCreateProxied(pthread_ptr, attr, startRoutine, arg);
      }
  
      // If on the main thread, and accessing Canvas/OffscreenCanvas failed, abort
      // with the detected error.
      if (error) return error;
  
      var threadParams = {
        startRoutine,
        pthread_ptr,
        arg,
        transferList,
      };
  
      if (ENVIRONMENT_IS_PTHREAD) {
        // The prepopulated pool of web workers that can host pthreads is stored
        // in the main JS thread. Therefore if a pthread is attempting to spawn a
        // new thread, the thread creation must be deferred to the main JS thread.
        threadParams.cmd = 'spawnThread';
        postMessage(threadParams, transferList);
        // When we defer thread creation this way, we have no way to detect thread
        // creation synchronously today, so we have to assume success and return 0.
        return 0;
      }
  
      // We are the main thread, so we have the pthread warmup pool in this
      // thread and can fire off JS thread creation directly ourselves.
      return spawnThread(threadParams);
    };


  /** @suppress {duplicate } */
  var syscallGetVarargI = () => {
      assert(SYSCALLS.varargs != undefined);
      // the `+` prepended here is necessary to convince the JSCompiler that varargs is indeed a number.
      var ret = HEAP32[((+SYSCALLS.varargs)>>2)];
      SYSCALLS.varargs += 4;
      return ret;
    };
  var syscallGetVarargP = syscallGetVarargI;
  
  
  var PATH = {
  isAbs:(path) => path.charAt(0) === '/',
  splitPath:(filename) => {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },
  normalizeArray:(parts, allowAboveRoot) => {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..');
          }
        }
        return parts;
      },
  normalize:(path) => {
        var isAbsolute = PATH.isAbs(path),
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter((p) => !!p), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },
  dirname:(path) => {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },
  basename:(path) => {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        path = PATH.normalize(path);
        path = path.replace(/\/$/, "");
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },
  join:(...paths) => PATH.normalize(paths.join('/')),
  join2:(l, r) => PATH.normalize(l + '/' + r),
  };
  
  var initRandomFill = () => {
      if (typeof crypto == 'object' && typeof crypto['getRandomValues'] == 'function') {
        // for modern web browsers
        // like with most Web APIs, we can't use Web Crypto API directly on shared memory,
        // so we need to create an intermediate buffer and copy it to the destination
        return (view) => (
          view.set(crypto.getRandomValues(new Uint8Array(view.byteLength))),
          // Return the original view to match modern native implementations.
          view
        );
      } else
      if (ENVIRONMENT_IS_NODE) {
        // for nodejs with or without crypto support included
        try {
          var crypto_module = require('crypto');
          var randomFillSync = crypto_module['randomFillSync'];
          if (randomFillSync) {
            // nodejs with LTS crypto support
            return (view) => crypto_module['randomFillSync'](view);
          }
          // very old nodejs with the original crypto API
          var randomBytes = crypto_module['randomBytes'];
          return (view) => (
            view.set(randomBytes(view.byteLength)),
            // Return the original view to match modern native implementations.
            view
          );
        } catch (e) {
          // nodejs doesn't have crypto support
        }
      }
      // we couldn't find a proper implementation, as Math.random() is not suitable for /dev/random, see emscripten-core/emscripten/pull/7096
      abort('no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: (array) => { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };');
    };
  var randomFill = (view) => {
      // Lazily init on the first invocation.
      return (randomFill = initRandomFill())(view);
    };
  
  
  
  var PATH_FS = {
  resolve:(...args) => {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? args[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path != 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = PATH.isAbs(path);
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter((p) => !!p), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },
  relative:(from, to) => {
        from = PATH_FS.resolve(from).substr(1);
        to = PATH_FS.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      },
  };
  
  
  
  var FS_stdin_getChar_buffer = [];
  
  var lengthBytesUTF8 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var c = str.charCodeAt(i); // possibly a lead surrogate
        if (c <= 0x7F) {
          len++;
        } else if (c <= 0x7FF) {
          len += 2;
        } else if (c >= 0xD800 && c <= 0xDFFF) {
          len += 4; ++i;
        } else {
          len += 3;
        }
      }
      return len;
    };
  
  var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
      assert(typeof str === 'string', `stringToUTF8Array expects a string (got ${typeof str})`);
      // Parameter maxBytesToWrite is not optional. Negative values, 0, null,
      // undefined and false each don't write out any bytes.
      if (!(maxBytesToWrite > 0))
        return 0;
  
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
        // and https://www.ietf.org/rfc/rfc2279.txt
        // and https://tools.ietf.org/html/rfc3629
        var u = str.charCodeAt(i); // possibly a lead surrogate
        if (u >= 0xD800 && u <= 0xDFFF) {
          var u1 = str.charCodeAt(++i);
          u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
        }
        if (u <= 0x7F) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 0x7FF) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 0xC0 | (u >> 6);
          heap[outIdx++] = 0x80 | (u & 63);
        } else if (u <= 0xFFFF) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 0xE0 | (u >> 12);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          if (u > 0x10FFFF) warnOnce('Invalid Unicode code point ' + ptrToString(u) + ' encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).');
          heap[outIdx++] = 0xF0 | (u >> 18);
          heap[outIdx++] = 0x80 | ((u >> 12) & 63);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        }
      }
      // Null-terminate the pointer to the buffer.
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
  /** @type {function(string, boolean=, number=)} */
  function intArrayFromString(stringy, dontAddNull, length) {
    var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
    var u8array = new Array(len);
    var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
    if (dontAddNull) u8array.length = numBytesWritten;
    return u8array;
  }
  var FS_stdin_getChar = () => {
      if (!FS_stdin_getChar_buffer.length) {
        var result = null;
        if (ENVIRONMENT_IS_NODE) {
          // we will read data by chunks of BUFSIZE
          var BUFSIZE = 256;
          var buf = Buffer.alloc(BUFSIZE);
          var bytesRead = 0;
  
          // For some reason we must suppress a closure warning here, even though
          // fd definitely exists on process.stdin, and is even the proper way to
          // get the fd of stdin,
          // https://github.com/nodejs/help/issues/2136#issuecomment-523649904
          // This started to happen after moving this logic out of library_tty.js,
          // so it is related to the surrounding code in some unclear manner.
          /** @suppress {missingProperties} */
          var fd = process.stdin.fd;
  
          try {
            bytesRead = fs.readSync(fd, buf, 0, BUFSIZE);
          } catch(e) {
            // Cross-platform differences: on Windows, reading EOF throws an
            // exception, but on other OSes, reading EOF returns 0. Uniformize
            // behavior by treating the EOF exception to return 0.
            if (e.toString().includes('EOF')) bytesRead = 0;
            else throw e;
          }
  
          if (bytesRead > 0) {
            result = buf.slice(0, bytesRead).toString('utf-8');
          }
        } else
        if (typeof window != 'undefined' &&
          typeof window.prompt == 'function') {
          // Browser.
          result = window.prompt('Input: ');  // returns null on cancel
          if (result !== null) {
            result += '\n';
          }
        } else
        {}
        if (!result) {
          return null;
        }
        FS_stdin_getChar_buffer = intArrayFromString(result, true);
      }
      return FS_stdin_getChar_buffer.shift();
    };
  var TTY = {
  ttys:[],
  init() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process.stdin.setEncoding('utf8');
        // }
      },
  shutdown() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process.stdin.pause();
        // }
      },
  register(dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },
  stream_ops:{
  open(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        },
  close(stream) {
          // flush any pending line data
          stream.tty.ops.fsync(stream.tty);
        },
  fsync(stream) {
          stream.tty.ops.fsync(stream.tty);
        },
  read(stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },
  write(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        },
  },
  default_tty_ops:{
  get_char(tty) {
          return FS_stdin_getChar();
        },
  put_char(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
          }
        },
  fsync(tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output));
            tty.output = [];
          }
        },
  ioctl_tcgets(tty) {
          // typical setting
          return {
            c_iflag: 25856,
            c_oflag: 5,
            c_cflag: 191,
            c_lflag: 35387,
            c_cc: [
              0x03, 0x1c, 0x7f, 0x15, 0x04, 0x00, 0x01, 0x00, 0x11, 0x13, 0x1a, 0x00,
              0x12, 0x0f, 0x17, 0x16, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
              0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            ]
          };
        },
  ioctl_tcsets(tty, optional_actions, data) {
          // currently just ignore
          return 0;
        },
  ioctl_tiocgwinsz(tty) {
          return [24, 80];
        },
  },
  default_tty1_ops:{
  put_char(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },
  fsync(tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output));
            tty.output = [];
          }
        },
  },
  };
  
  
  var zeroMemory = (address, size) => {
      HEAPU8.fill(0, address, address + size);
    };
  
  var alignMemory = (size, alignment) => {
      assert(alignment, "alignment argument is required");
      return Math.ceil(size / alignment) * alignment;
    };
  var mmapAlloc = (size) => {
      abort('internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported');
    };
  var MEMFS = {
  ops_table:null,
  mount(mount) {
        return MEMFS.createNode(null, '/', 16895, 0);
      },
  createNode(parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(63);
        }
        MEMFS.ops_table ||= {
          dir: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              lookup: MEMFS.node_ops.lookup,
              mknod: MEMFS.node_ops.mknod,
              rename: MEMFS.node_ops.rename,
              unlink: MEMFS.node_ops.unlink,
              rmdir: MEMFS.node_ops.rmdir,
              readdir: MEMFS.node_ops.readdir,
              symlink: MEMFS.node_ops.symlink
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek
            }
          },
          file: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek,
              read: MEMFS.stream_ops.read,
              write: MEMFS.stream_ops.write,
              allocate: MEMFS.stream_ops.allocate,
              mmap: MEMFS.stream_ops.mmap,
              msync: MEMFS.stream_ops.msync
            }
          },
          link: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              readlink: MEMFS.node_ops.readlink
            },
            stream: {}
          },
          chrdev: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr
            },
            stream: FS.chrdev_stream_ops
          }
        };
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
          node.contents = null; 
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
          parent.timestamp = node.timestamp;
        }
        return node;
      },
  getFileDataAsTypedArray(node) {
        if (!node.contents) return new Uint8Array(0);
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },
  expandFileStorage(node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
        // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
        // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
        // avoid overshooting the allocation cap by a very large margin.
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) >>> 0);
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity); // Allocate new storage.
        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
      },
  resizeFileStorage(node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.
          node.usedBytes = 0;
        } else {
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize); // Allocate new storage.
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }
          node.usedBytes = newSize;
        }
      },
  node_ops:{
  getattr(node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },
  setattr(node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },
  lookup(parent, name) {
          throw new FS.ErrnoError(44);
        },
  mknod(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },
  rename(old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.parent.timestamp = Date.now()
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          new_dir.timestamp = old_node.parent.timestamp;
        },
  unlink(parent, name) {
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
  rmdir(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
  readdir(node) {
          var entries = ['.', '..'];
          for (var key of Object.keys(node.contents)) {
            entries.push(key);
          }
          return entries;
        },
  symlink(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 0o777 | 40960, 0);
          node.link = oldpath;
          return node;
        },
  readlink(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        },
  },
  stream_ops:{
  read(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        },
  write(stream, buffer, offset, length, position, canOwn) {
          // The data buffer should be a typed array view
          assert(!(buffer instanceof ArrayBuffer));
  
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
  
          if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
            if (canOwn) {
              assert(position === 0, 'canOwn must imply no weird position inside the file');
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = buffer.slice(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
  
          // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
          MEMFS.expandFileStorage(node, position+length);
          if (node.contents.subarray && buffer.subarray) {
            // Use typed array write which is available.
            node.contents.set(buffer.subarray(offset, offset + length), position);
          } else {
            for (var i = 0; i < length; i++) {
             node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        },
  llseek(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        },
  allocate(stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },
  mmap(stream, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if (!(flags & 2) && contents && contents.buffer === HEAP8.buffer) {
            // We can't emulate MAP_SHARED when the file is not backed by the
            // buffer we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            allocated = true;
            ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            if (contents) {
              // Try to avoid unnecessary slices.
              if (position > 0 || position + length < contents.length) {
                if (contents.subarray) {
                  contents = contents.subarray(position, position + length);
                } else {
                  contents = Array.prototype.slice.call(contents, position, position + length);
                }
              }
              HEAP8.set(contents, ptr);
            }
          }
          return { ptr, allocated };
        },
  msync(stream, buffer, offset, length, mmapFlags) {
          MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          // should we check if bytesWritten and length are the same?
          return 0;
        },
  },
  };
  
  /** @param {boolean=} noRunDep */
  var asyncLoad = (url, onload, onerror, noRunDep) => {
      var dep = !noRunDep ? getUniqueRunDependency(`al ${url}`) : '';
      readAsync(url).then(
        (arrayBuffer) => {
          assert(arrayBuffer, `Loading data file "${url}" failed (no arrayBuffer).`);
          onload(new Uint8Array(arrayBuffer));
          if (dep) removeRunDependency(dep);
        },
        (err) => {
          if (onerror) {
            onerror();
          } else {
            throw `Loading data file "${url}" failed.`;
          }
        }
      );
      if (dep) addRunDependency(dep);
    };
  
  
  var FS_createDataFile = (parent, name, fileData, canRead, canWrite, canOwn) => {
      FS.createDataFile(parent, name, fileData, canRead, canWrite, canOwn);
    };
  
  var preloadPlugins = Module['preloadPlugins'] || [];
  var FS_handledByPreloadPlugin = (byteArray, fullname, finish, onerror) => {
      // Ensure plugins are ready.
      if (typeof Browser != 'undefined') Browser.init();
  
      var handled = false;
      preloadPlugins.forEach((plugin) => {
        if (handled) return;
        if (plugin['canHandle'](fullname)) {
          plugin['handle'](byteArray, fullname, finish, onerror);
          handled = true;
        }
      });
      return handled;
    };
  var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
      // TODO we should allow people to just pass in a complete filename instead
      // of parent and name being that we just join them anyways
      var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
      var dep = getUniqueRunDependency(`cp ${fullname}`); // might have several active requests for the same fullname
      function processData(byteArray) {
        function finish(byteArray) {
          preFinish?.();
          if (!dontCreateFile) {
            FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
          }
          onload?.();
          removeRunDependency(dep);
        }
        if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
          onerror?.();
          removeRunDependency(dep);
        })) {
          return;
        }
        finish(byteArray);
      }
      addRunDependency(dep);
      if (typeof url == 'string') {
        asyncLoad(url, processData, onerror);
      } else {
        processData(url);
      }
    };
  
  var FS_modeStringToFlags = (str) => {
      var flagModes = {
        'r': 0,
        'r+': 2,
        'w': 512 | 64 | 1,
        'w+': 512 | 64 | 2,
        'a': 1024 | 64 | 1,
        'a+': 1024 | 64 | 2,
      };
      var flags = flagModes[str];
      if (typeof flags == 'undefined') {
        throw new Error(`Unknown file open mode: ${str}`);
      }
      return flags;
    };
  
  var FS_getMode = (canRead, canWrite) => {
      var mode = 0;
      if (canRead) mode |= 292 | 73;
      if (canWrite) mode |= 146;
      return mode;
    };
  
  
  
  
  
  
  var strError = (errno) => UTF8ToString(_strerror(errno));
  
  var ERRNO_CODES = {
      'EPERM': 63,
      'ENOENT': 44,
      'ESRCH': 71,
      'EINTR': 27,
      'EIO': 29,
      'ENXIO': 60,
      'E2BIG': 1,
      'ENOEXEC': 45,
      'EBADF': 8,
      'ECHILD': 12,
      'EAGAIN': 6,
      'EWOULDBLOCK': 6,
      'ENOMEM': 48,
      'EACCES': 2,
      'EFAULT': 21,
      'ENOTBLK': 105,
      'EBUSY': 10,
      'EEXIST': 20,
      'EXDEV': 75,
      'ENODEV': 43,
      'ENOTDIR': 54,
      'EISDIR': 31,
      'EINVAL': 28,
      'ENFILE': 41,
      'EMFILE': 33,
      'ENOTTY': 59,
      'ETXTBSY': 74,
      'EFBIG': 22,
      'ENOSPC': 51,
      'ESPIPE': 70,
      'EROFS': 69,
      'EMLINK': 34,
      'EPIPE': 64,
      'EDOM': 18,
      'ERANGE': 68,
      'ENOMSG': 49,
      'EIDRM': 24,
      'ECHRNG': 106,
      'EL2NSYNC': 156,
      'EL3HLT': 107,
      'EL3RST': 108,
      'ELNRNG': 109,
      'EUNATCH': 110,
      'ENOCSI': 111,
      'EL2HLT': 112,
      'EDEADLK': 16,
      'ENOLCK': 46,
      'EBADE': 113,
      'EBADR': 114,
      'EXFULL': 115,
      'ENOANO': 104,
      'EBADRQC': 103,
      'EBADSLT': 102,
      'EDEADLOCK': 16,
      'EBFONT': 101,
      'ENOSTR': 100,
      'ENODATA': 116,
      'ETIME': 117,
      'ENOSR': 118,
      'ENONET': 119,
      'ENOPKG': 120,
      'EREMOTE': 121,
      'ENOLINK': 47,
      'EADV': 122,
      'ESRMNT': 123,
      'ECOMM': 124,
      'EPROTO': 65,
      'EMULTIHOP': 36,
      'EDOTDOT': 125,
      'EBADMSG': 9,
      'ENOTUNIQ': 126,
      'EBADFD': 127,
      'EREMCHG': 128,
      'ELIBACC': 129,
      'ELIBBAD': 130,
      'ELIBSCN': 131,
      'ELIBMAX': 132,
      'ELIBEXEC': 133,
      'ENOSYS': 52,
      'ENOTEMPTY': 55,
      'ENAMETOOLONG': 37,
      'ELOOP': 32,
      'EOPNOTSUPP': 138,
      'EPFNOSUPPORT': 139,
      'ECONNRESET': 15,
      'ENOBUFS': 42,
      'EAFNOSUPPORT': 5,
      'EPROTOTYPE': 67,
      'ENOTSOCK': 57,
      'ENOPROTOOPT': 50,
      'ESHUTDOWN': 140,
      'ECONNREFUSED': 14,
      'EADDRINUSE': 3,
      'ECONNABORTED': 13,
      'ENETUNREACH': 40,
      'ENETDOWN': 38,
      'ETIMEDOUT': 73,
      'EHOSTDOWN': 142,
      'EHOSTUNREACH': 23,
      'EINPROGRESS': 26,
      'EALREADY': 7,
      'EDESTADDRREQ': 17,
      'EMSGSIZE': 35,
      'EPROTONOSUPPORT': 66,
      'ESOCKTNOSUPPORT': 137,
      'EADDRNOTAVAIL': 4,
      'ENETRESET': 39,
      'EISCONN': 30,
      'ENOTCONN': 53,
      'ETOOMANYREFS': 141,
      'EUSERS': 136,
      'EDQUOT': 19,
      'ESTALE': 72,
      'ENOTSUP': 138,
      'ENOMEDIUM': 148,
      'EILSEQ': 25,
      'EOVERFLOW': 61,
      'ECANCELED': 11,
      'ENOTRECOVERABLE': 56,
      'EOWNERDEAD': 62,
      'ESTRPIPE': 135,
    };
  var FS = {
  root:null,
  mounts:[],
  devices:{
  },
  streams:[],
  nextInode:1,
  nameTable:null,
  currentPath:"/",
  initialized:false,
  ignorePermissions:true,
  ErrnoError:class extends Error {
        name = 'ErrnoError';
        // We set the `name` property to be able to identify `FS.ErrnoError`
        // - the `name` is a standard ECMA-262 property of error objects. Kind of good to have it anyway.
        // - when using PROXYFS, an error can come from an underlying FS
        // as different FS objects have their own FS.ErrnoError each,
        // the test `err instanceof FS.ErrnoError` won't detect an error coming from another filesystem, causing bugs.
        // we'll use the reliable test `err.name == "ErrnoError"` instead
        constructor(errno) {
          super(runtimeInitialized ? strError(errno) : '');
          this.errno = errno;
          for (var key in ERRNO_CODES) {
            if (ERRNO_CODES[key] === errno) {
              this.code = key;
              break;
            }
          }
        }
      },
  filesystems:null,
  syncFSRequests:0,
  readFiles:{
  },
  FSStream:class {
        shared = {};
        get object() {
          return this.node;
        }
        set object(val) {
          this.node = val;
        }
        get isRead() {
          return (this.flags & 2097155) !== 1;
        }
        get isWrite() {
          return (this.flags & 2097155) !== 0;
        }
        get isAppend() {
          return (this.flags & 1024);
        }
        get flags() {
          return this.shared.flags;
        }
        set flags(val) {
          this.shared.flags = val;
        }
        get position() {
          return this.shared.position;
        }
        set position(val) {
          this.shared.position = val;
        }
      },
  FSNode:class {
        node_ops = {};
        stream_ops = {};
        readMode = 292 | 73;
        writeMode = 146;
        mounted = null;
        constructor(parent, name, mode, rdev) {
          if (!parent) {
            parent = this;  // root node sets parent to itself
          }
          this.parent = parent;
          this.mount = parent.mount;
          this.id = FS.nextInode++;
          this.name = name;
          this.mode = mode;
          this.rdev = rdev;
        }
        get read() {
          return (this.mode & this.readMode) === this.readMode;
        }
        set read(val) {
          val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
        }
        get write() {
          return (this.mode & this.writeMode) === this.writeMode;
        }
        set write(val) {
          val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
        }
        get isFolder() {
          return FS.isDir(this.mode);
        }
        get isDevice() {
          return FS.isChrdev(this.mode);
        }
      },
  lookupPath(path, opts = {}) {
        path = PATH_FS.resolve(path);
  
        if (!path) return { path: '', node: null };
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        opts = Object.assign(defaults, opts)
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(32);
        }
  
        // split the absolute path
        var parts = path.split('/').filter((p) => !!p);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
  
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count + 1 });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(32);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },
  getPath(node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? `${mount}/${path}` : mount + path;
          }
          path = path ? `${node.name}/${path}` : node.name;
          node = node.parent;
        }
      },
  hashName(parentid, name) {
        var hash = 0;
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },
  hashAddNode(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },
  hashRemoveNode(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },
  lookupNode(parent, name) {
        var errCode = FS.mayLookup(parent);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },
  createNode(parent, name, mode, rdev) {
        assert(typeof parent == 'object')
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },
  destroyNode(node) {
        FS.hashRemoveNode(node);
      },
  isRoot(node) {
        return node === node.parent;
      },
  isMountpoint(node) {
        return !!node.mounted;
      },
  isFile(mode) {
        return (mode & 61440) === 32768;
      },
  isDir(mode) {
        return (mode & 61440) === 16384;
      },
  isLink(mode) {
        return (mode & 61440) === 40960;
      },
  isChrdev(mode) {
        return (mode & 61440) === 8192;
      },
  isBlkdev(mode) {
        return (mode & 61440) === 24576;
      },
  isFIFO(mode) {
        return (mode & 61440) === 4096;
      },
  isSocket(mode) {
        return (mode & 49152) === 49152;
      },
  flagsToPermissionString(flag) {
        var perms = ['r', 'w', 'rw'][flag & 3];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },
  nodePermissions(node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.includes('r') && !(node.mode & 292)) {
          return 2;
        } else if (perms.includes('w') && !(node.mode & 146)) {
          return 2;
        } else if (perms.includes('x') && !(node.mode & 73)) {
          return 2;
        }
        return 0;
      },
  mayLookup(dir) {
        if (!FS.isDir(dir.mode)) return 54;
        var errCode = FS.nodePermissions(dir, 'x');
        if (errCode) return errCode;
        if (!dir.node_ops.lookup) return 2;
        return 0;
      },
  mayCreate(dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },
  mayDelete(dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var errCode = FS.nodePermissions(dir, 'wx');
        if (errCode) {
          return errCode;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31;
          }
        }
        return 0;
      },
  mayOpen(node, flags) {
        if (!node) {
          return 44;
        }
        if (FS.isLink(node.mode)) {
          return 32;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' || // opening for write
              (flags & 512)) { // TODO: check for O_SEARCH? (== search for dir only)
            return 31;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },
  MAX_OPEN_FDS:4096,
  nextfd() {
        for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      },
  getStreamChecked(fd) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        return stream;
      },
  getStream:(fd) => FS.streams[fd],
  createStream(stream, fd = -1) {
        assert(fd >= -1);
  
        // clone it, so we can return an instance of FSStream
        stream = Object.assign(new FS.FSStream(), stream);
        if (fd == -1) {
          fd = FS.nextfd();
        }
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },
  closeStream(fd) {
        FS.streams[fd] = null;
      },
  dupStream(origStream, fd = -1) {
        var stream = FS.createStream(origStream, fd);
        stream.stream_ops?.dup?.(stream);
        return stream;
      },
  chrdev_stream_ops:{
  open(stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          stream.stream_ops.open?.(stream);
        },
  llseek() {
          throw new FS.ErrnoError(70);
        },
  },
  major:(dev) => ((dev) >> 8),
  minor:(dev) => ((dev) & 0xff),
  makedev:(ma, mi) => ((ma) << 8 | (mi)),
  registerDevice(dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },
  getDevice:(dev) => FS.devices[dev],
  getMounts(mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push(...m.mounts);
        }
  
        return mounts;
      },
  syncfs(populate, callback) {
        if (typeof populate == 'function') {
          callback = populate;
          populate = false;
        }
  
        FS.syncFSRequests++;
  
        if (FS.syncFSRequests > 1) {
          err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function doCallback(errCode) {
          assert(FS.syncFSRequests > 0);
          FS.syncFSRequests--;
          return callback(errCode);
        }
  
        function done(errCode) {
          if (errCode) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(errCode);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach((mount) => {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },
  mount(type, opts, mountpoint) {
        if (typeof type == 'string') {
          // The filesystem was not included, and instead we have an error
          // message stored in the variable.
          throw type;
        }
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(10);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
        }
  
        var mount = {
          type,
          opts,
          mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },
  unmount(mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach((hash) => {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.includes(current.mount)) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },
  lookup(parent, name) {
        return parent.node_ops.lookup(parent, name);
      },
  mknod(path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.mayCreate(parent, name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },
  statfs(path) {
  
        // NOTE: None of the defaults here are true. We're just returning safe and
        //       sane values.
        var rtn = {
          bsize: 4096,
          frsize: 4096,
          blocks: 1e6,
          bfree: 5e5,
          bavail: 5e5,
          files: FS.nextInode,
          ffree: FS.nextInode - 1,
          fsid: 42,
          flags: 2,
          namelen: 255,
        };
  
        var parent = FS.lookupPath(path, {follow: true}).node;
        if (parent?.node_ops.statfs) {
          Object.assign(rtn, parent.node_ops.statfs(parent.mount.opts.root));
        }
        return rtn;
      },
  create(path, mode = 0o666) {
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },
  mkdir(path, mode = 0o777) {
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },
  mkdirTree(path, mode) {
        var dirs = path.split('/');
        var d = '';
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue;
          d += '/' + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch(e) {
            if (e.errno != 20) throw e;
          }
        }
      },
  mkdev(path, mode, dev) {
        if (typeof dev == 'undefined') {
          dev = mode;
          mode = 0o666;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },
  symlink(oldpath, newpath) {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var newname = PATH.basename(newpath);
        var errCode = FS.mayCreate(parent, newname);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },
  rename(old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
  
        // let the errors from non existent directories percolate up
        lookup = FS.lookupPath(old_path, { parent: true });
        old_dir = lookup.node;
        lookup = FS.lookupPath(new_path, { parent: true });
        new_dir = lookup.node;
  
        if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(28);
        }
        // new path should not be an ancestor of the old path
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(55);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var errCode = FS.mayDelete(old_dir, old_name, isdir);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        errCode = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(10);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          errCode = FS.nodePermissions(old_dir, 'w');
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
          // update old node (we do this here to avoid each backend
          // needing to)
          old_node.parent = new_dir;
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
      },
  rmdir(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, true);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },
  readdir(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54);
        }
        return node.node_ops.readdir(node);
      },
  unlink(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, false);
        if (errCode) {
          // According to POSIX, we should map EISDIR to EPERM, but
          // we instead do what Linux does (and we must, as we use
          // the musl linux libc).
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },
  readlink(path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return link.node_ops.readlink(link);
      },
  stat(path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63);
        }
        return node.node_ops.getattr(node);
      },
  lstat(path) {
        return FS.stat(path, true);
      },
  chmod(path, mode, dontFollow) {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },
  lchmod(path, mode) {
        FS.chmod(path, mode, true);
      },
  fchmod(fd, mode) {
        var stream = FS.getStreamChecked(fd);
        FS.chmod(stream.node, mode);
      },
  chown(path, uid, gid, dontFollow) {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },
  lchown(path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },
  fchown(fd, uid, gid) {
        var stream = FS.getStreamChecked(fd);
        FS.chown(stream.node, uid, gid);
      },
  truncate(path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(28);
        }
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.nodePermissions(node, 'w');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },
  ftruncate(fd, len) {
        var stream = FS.getStreamChecked(fd);
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.truncate(stream.node, len);
      },
  utime(path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },
  open(path, flags, mode = 0o666) {
        if (path === "") {
          throw new FS.ErrnoError(44);
        }
        flags = typeof flags == 'string' ? FS_modeStringToFlags(flags) : flags;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path == 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        var created = false;
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(20);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // if asked only for a directory, then this must be one
        if ((flags & 65536) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
        // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)
        if (!created) {
          var errCode = FS.mayOpen(node, flags);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // do truncation if necessary
        if ((flags & 512) && !created) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512 | 131072);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        });
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
          }
        }
        return stream;
      },
  close(stream) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (stream.getdents) stream.getdents = null; // free readdir state
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      },
  isClosed(stream) {
        return stream.fd === null;
      },
  llseek(stream, offset, whence) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70);
        }
        if (whence != 0 && whence != 1 && whence != 2) {
          throw new FS.ErrnoError(28);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },
  read(stream, buffer, offset, length, position) {
        assert(offset >= 0);
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },
  write(stream, buffer, offset, length, position, canOwn) {
        assert(offset >= 0);
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28);
        }
        if (stream.seekable && stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },
  allocate(stream, offset, length) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(28);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(138);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },
  mmap(stream, length, position, prot, flags) {
        // User requests writing to file (prot & PROT_WRITE != 0).
        // Checking if we have permissions to write to the file unless
        // MAP_PRIVATE flag is set. According to POSIX spec it is possible
        // to write to file opened in read-only mode with MAP_PRIVATE flag,
        // as all modifications will be visible only in the memory of
        // the current process.
        if ((prot & 2) !== 0
            && (flags & 2) === 0
            && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(2);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43);
        }
        if (!length) {
          throw new FS.ErrnoError(28);
        }
        return stream.stream_ops.mmap(stream, length, position, prot, flags);
      },
  msync(stream, buffer, offset, length, mmapFlags) {
        assert(offset >= 0);
        if (!stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
      },
  ioctl(stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },
  readFile(path, opts = {}) {
        opts.flags = opts.flags || 0;
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error(`Invalid encoding type "${opts.encoding}"`);
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = UTF8ArrayToString(buf);
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },
  writeFile(path, data, opts = {}) {
        opts.flags = opts.flags || 577;
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data == 'string') {
          var buf = new Uint8Array(lengthBytesUTF8(data)+1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
          throw new Error('Unsupported data type');
        }
        FS.close(stream);
      },
  cwd:() => FS.currentPath,
  chdir(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
          throw new FS.ErrnoError(44);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54);
        }
        var errCode = FS.nodePermissions(lookup.node, 'x');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        FS.currentPath = lookup.path;
      },
  createDefaultDirectories() {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },
  createDefaultDevices() {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: () => 0,
          write: (stream, buffer, offset, length, pos) => length,
          llseek: () => 0,
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using err() rather than out()
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // setup /dev/[u]random
        // use a buffer to avoid overhead of individual crypto calls per byte
        var randomBuffer = new Uint8Array(1024), randomLeft = 0;
        var randomByte = () => {
          if (randomLeft === 0) {
            randomLeft = randomFill(randomBuffer).byteLength;
          }
          return randomBuffer[--randomLeft];
        };
        FS.createDevice('/dev', 'random', randomByte);
        FS.createDevice('/dev', 'urandom', randomByte);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },
  createSpecialDirectories() {
        // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the
        // name of the stream for fd 6 (see test_unistd_ttyname)
        FS.mkdir('/proc');
        var proc_self = FS.mkdir('/proc/self');
        FS.mkdir('/proc/self/fd');
        FS.mount({
          mount() {
            var node = FS.createNode(proc_self, 'fd', 16895, 73);
            node.node_ops = {
              lookup(parent, name) {
                var fd = +name;
                var stream = FS.getStreamChecked(fd);
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: { readlink: () => stream.path },
                };
                ret.parent = ret; // make it look like a simple root node
                return ret;
              }
            };
            return node;
          }
        }, {}, '/proc/self/fd');
      },
  createStandardStreams(input, output, error) {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (input) {
          FS.createDevice('/dev', 'stdin', input);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (output) {
          FS.createDevice('/dev', 'stdout', null, output);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (error) {
          FS.createDevice('/dev', 'stderr', null, error);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 0);
        var stdout = FS.open('/dev/stdout', 1);
        var stderr = FS.open('/dev/stderr', 1);
        assert(stdin.fd === 0, `invalid handle for stdin (${stdin.fd})`);
        assert(stdout.fd === 1, `invalid handle for stdout (${stdout.fd})`);
        assert(stderr.fd === 2, `invalid handle for stderr (${stderr.fd})`);
      },
  staticInit() {
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
  
        FS.filesystems = {
          'MEMFS': MEMFS,
        };
      },
  init(input, output, error) {
        assert(!FS.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.initialized = true;
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        input ??= Module['stdin'];
        output ??= Module['stdout'];
        error ??= Module['stderr'];
  
        FS.createStandardStreams(input, output, error);
      },
  quit() {
        FS.initialized = false;
        // force-flush all streams, so we get musl std streams printed out
        _fflush(0);
        // close all of our streams
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },
  findObject(path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (!ret.exists) {
          return null;
        }
        return ret.object;
      },
  analyzePath(path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },
  createPath(parent, path, canRead, canWrite) {
        parent = typeof parent == 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },
  createFile(parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(canRead, canWrite);
        return FS.create(path, mode);
      },
  createDataFile(parent, name, data, canRead, canWrite, canOwn) {
        var path = name;
        if (parent) {
          parent = typeof parent == 'string' ? parent : FS.getPath(parent);
          path = name ? PATH.join2(parent, name) : parent;
        }
        var mode = FS_getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data == 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 577);
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
      },
  createDevice(parent, name, input, output) {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(!!input, !!output);
        FS.createDevice.major ??= 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open(stream) {
            stream.seekable = false;
          },
          close(stream) {
            // flush any pending line data
            if (output?.buffer?.length) {
              output(10);
            }
          },
          read(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },
  forceLoadFile(obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        if (typeof XMLHttpRequest != 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else { // Command-line.
          try {
            obj.contents = readBinary(obj.url);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        }
      },
  createLazyFile(parent, name, url, canRead, canWrite) {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array).
        // Actual getting is abstracted away for eventual reuse.
        class LazyUint8Array {
          lengthKnown = false;
          chunks = []; // Loaded chunks. Index is the chunk number
          get(idx) {
            if (idx > this.length-1 || idx < 0) {
              return undefined;
            }
            var chunkOffset = idx % this.chunkSize;
            var chunkNum = (idx / this.chunkSize)|0;
            return this.getter(chunkNum)[chunkOffset];
          }
          setDataGetter(getter) {
            this.getter = getter;
          }
          cacheLength() {
            // Find length
            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', url, false);
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            var datalength = Number(xhr.getResponseHeader("Content-length"));
            var header;
            var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
            var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
  
            var chunkSize = 1024*1024; // Chunk size in bytes
  
            if (!hasByteServing) chunkSize = datalength;
  
            // Function to get a range from the remote URL.
            var doXHR = (from, to) => {
              if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
              if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
              // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
              var xhr = new XMLHttpRequest();
              xhr.open('GET', url, false);
              if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
              // Some hints to the browser that we want binary data.
              xhr.responseType = 'arraybuffer';
              if (xhr.overrideMimeType) {
                xhr.overrideMimeType('text/plain; charset=x-user-defined');
              }
  
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              if (xhr.response !== undefined) {
                return new Uint8Array(/** @type{Array<number>} */(xhr.response || []));
              }
              return intArrayFromString(xhr.responseText || '', true);
            };
            var lazyArray = this;
            lazyArray.setDataGetter((chunkNum) => {
              var start = chunkNum * chunkSize;
              var end = (chunkNum+1) * chunkSize - 1; // including this byte
              end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
              if (typeof lazyArray.chunks[chunkNum] == 'undefined') {
                lazyArray.chunks[chunkNum] = doXHR(start, end);
              }
              if (typeof lazyArray.chunks[chunkNum] == 'undefined') throw new Error('doXHR failed!');
              return lazyArray.chunks[chunkNum];
            });
  
            if (usesGzip || !datalength) {
              // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
              chunkSize = datalength = 1; // this will force getter(0)/doXHR do download the whole file
              datalength = this.getter(0).length;
              chunkSize = datalength;
              out("LazyFiles on gzip forces download of the whole file when length is accessed");
            }
  
            this._length = datalength;
            this._chunkSize = chunkSize;
            this.lengthKnown = true;
          }
          get length() {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._length;
          }
          get chunkSize() {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._chunkSize;
          }
        }
  
        if (typeof XMLHttpRequest != 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // Add a function that defers querying the file size until it is asked the first time.
        Object.defineProperties(node, {
          usedBytes: {
            get: function() { return this.contents.length; }
          }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach((key) => {
          var fn = node.stream_ops[key];
          stream_ops[key] = (...args) => {
            FS.forceLoadFile(node);
            return fn(...args);
          };
        });
        function writeChunks(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        }
        // use a custom read function
        stream_ops.read = (stream, buffer, offset, length, position) => {
          FS.forceLoadFile(node);
          return writeChunks(stream, buffer, offset, length, position)
        };
        // use a custom mmap function
        stream_ops.mmap = (stream, length, position, prot, flags) => {
          FS.forceLoadFile(node);
          var ptr = mmapAlloc(length);
          if (!ptr) {
            throw new FS.ErrnoError(48);
          }
          writeChunks(stream, HEAP8, ptr, length, position);
          return { ptr, allocated: true };
        };
        node.stream_ops = stream_ops;
        return node;
      },
  absolutePath() {
        abort('FS.absolutePath has been removed; use PATH_FS.resolve instead');
      },
  createFolder() {
        abort('FS.createFolder has been removed; use FS.mkdir instead');
      },
  createLink() {
        abort('FS.createLink has been removed; use FS.symlink instead');
      },
  joinPath() {
        abort('FS.joinPath has been removed; use PATH.join instead');
      },
  mmapAlloc() {
        abort('FS.mmapAlloc has been replaced by the top level function mmapAlloc');
      },
  standardizePath() {
        abort('FS.standardizePath has been removed; use PATH.normalize instead');
      },
  };
  
  var SYSCALLS = {
  DEFAULT_POLLMASK:5,
  calculateAt(dirfd, path, allowEmpty) {
        if (PATH.isAbs(path)) {
          return path;
        }
        // relative path
        var dir;
        if (dirfd === -100) {
          dir = FS.cwd();
        } else {
          var dirstream = SYSCALLS.getStreamFromFD(dirfd);
          dir = dirstream.path;
        }
        if (path.length == 0) {
          if (!allowEmpty) {
            throw new FS.ErrnoError(44);;
          }
          return dir;
        }
        return PATH.join2(dir, path);
      },
  doStat(func, path, buf) {
        var stat = func(path);
        HEAP32[((buf)>>2)] = stat.dev;
        HEAP32[(((buf)+(4))>>2)] = stat.mode;
        HEAPU32[(((buf)+(8))>>2)] = stat.nlink;
        HEAP32[(((buf)+(12))>>2)] = stat.uid;
        HEAP32[(((buf)+(16))>>2)] = stat.gid;
        HEAP32[(((buf)+(20))>>2)] = stat.rdev;
        HEAP64[(((buf)+(24))>>3)] = BigInt(stat.size);
        HEAP32[(((buf)+(32))>>2)] = 4096;
        HEAP32[(((buf)+(36))>>2)] = stat.blocks;
        var atime = stat.atime.getTime();
        var mtime = stat.mtime.getTime();
        var ctime = stat.ctime.getTime();
        HEAP64[(((buf)+(40))>>3)] = BigInt(Math.floor(atime / 1000));
        HEAPU32[(((buf)+(48))>>2)] = (atime % 1000) * 1000 * 1000;
        HEAP64[(((buf)+(56))>>3)] = BigInt(Math.floor(mtime / 1000));
        HEAPU32[(((buf)+(64))>>2)] = (mtime % 1000) * 1000 * 1000;
        HEAP64[(((buf)+(72))>>3)] = BigInt(Math.floor(ctime / 1000));
        HEAPU32[(((buf)+(80))>>2)] = (ctime % 1000) * 1000 * 1000;
        HEAP64[(((buf)+(88))>>3)] = BigInt(stat.ino);
        return 0;
      },
  doMsync(addr, stream, len, flags, offset) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (flags & 2) {
          // MAP_PRIVATE calls need not to be synced back to underlying fs
          return 0;
        }
        var buffer = HEAPU8.slice(addr, addr + len);
        FS.msync(stream, buffer, offset, len, flags);
      },
  getStreamFromFD(fd) {
        var stream = FS.getStreamChecked(fd);
        return stream;
      },
  varargs:undefined,
  getStr(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },
  };
  
  
  function ___syscall_fcntl64(fd, cmd, varargs) {
  if (ENVIRONMENT_IS_PTHREAD)
    return proxyToMainThread(3, 0, 1, fd, cmd, varargs);
  
  SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (cmd) {
        case 0: {
          var arg = syscallGetVarargI();
          if (arg < 0) {
            return -28;
          }
          while (FS.streams[arg]) {
            arg++;
          }
          var newStream;
          newStream = FS.dupStream(stream, arg);
          return newStream.fd;
        }
        case 1:
        case 2:
          return 0;  // FD_CLOEXEC makes no sense for a single process.
        case 3:
          return stream.flags;
        case 4: {
          var arg = syscallGetVarargI();
          stream.flags |= arg;
          return 0;
        }
        case 12: {
          var arg = syscallGetVarargP();
          var offset = 0;
          // We're always unlocked.
          HEAP16[(((arg)+(offset))>>1)] = 2;
          return 0;
        }
        case 13:
        case 14:
          return 0; // Pretend that the locking is successful.
      }
      return -28;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  
  }
  

  
  
  
  function ___syscall_ioctl(fd, op, varargs) {
  if (ENVIRONMENT_IS_PTHREAD)
    return proxyToMainThread(4, 0, 1, fd, op, varargs);
  
  SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (op) {
        case 21509: {
          if (!stream.tty) return -59;
          return 0;
        }
        case 21505: {
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tcgets) {
            var termios = stream.tty.ops.ioctl_tcgets(stream);
            var argp = syscallGetVarargP();
            HEAP32[((argp)>>2)] = termios.c_iflag || 0;
            HEAP32[(((argp)+(4))>>2)] = termios.c_oflag || 0;
            HEAP32[(((argp)+(8))>>2)] = termios.c_cflag || 0;
            HEAP32[(((argp)+(12))>>2)] = termios.c_lflag || 0;
            for (var i = 0; i < 32; i++) {
              HEAP8[(argp + i)+(17)] = termios.c_cc[i] || 0;
            }
            return 0;
          }
          return 0;
        }
        case 21510:
        case 21511:
        case 21512: {
          if (!stream.tty) return -59;
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21506:
        case 21507:
        case 21508: {
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tcsets) {
            var argp = syscallGetVarargP();
            var c_iflag = HEAP32[((argp)>>2)];
            var c_oflag = HEAP32[(((argp)+(4))>>2)];
            var c_cflag = HEAP32[(((argp)+(8))>>2)];
            var c_lflag = HEAP32[(((argp)+(12))>>2)];
            var c_cc = []
            for (var i = 0; i < 32; i++) {
              c_cc.push(HEAP8[(argp + i)+(17)]);
            }
            return stream.tty.ops.ioctl_tcsets(stream.tty, op, { c_iflag, c_oflag, c_cflag, c_lflag, c_cc });
          }
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21519: {
          if (!stream.tty) return -59;
          var argp = syscallGetVarargP();
          HEAP32[((argp)>>2)] = 0;
          return 0;
        }
        case 21520: {
          if (!stream.tty) return -59;
          return -28; // not supported
        }
        case 21531: {
          var argp = syscallGetVarargP();
          return FS.ioctl(stream, op, argp);
        }
        case 21523: {
          // TODO: in theory we should write to the winsize struct that gets
          // passed in, but for now musl doesn't read anything on it
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tiocgwinsz) {
            var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
            var argp = syscallGetVarargP();
            HEAP16[((argp)>>1)] = winsize[0];
            HEAP16[(((argp)+(2))>>1)] = winsize[1];
          }
          return 0;
        }
        case 21524: {
          // TODO: technically, this ioctl call should change the window size.
          // but, since emscripten doesn't have any concept of a terminal window
          // yet, we'll just silently throw it away as we do TIOCGWINSZ
          if (!stream.tty) return -59;
          return 0;
        }
        case 21515: {
          if (!stream.tty) return -59;
          return 0;
        }
        default: return -28; // not supported
      }
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  
  }
  

  
  
  
  function ___syscall_openat(dirfd, path, flags, varargs) {
  if (ENVIRONMENT_IS_PTHREAD)
    return proxyToMainThread(5, 0, 1, dirfd, path, flags, varargs);
  
  SYSCALLS.varargs = varargs;
  try {
  
      path = SYSCALLS.getStr(path);
      path = SYSCALLS.calculateAt(dirfd, path);
      var mode = varargs ? syscallGetVarargI() : 0;
      return FS.open(path, flags, mode).fd;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  
  }
  

  var __abort_js = () =>
      abort('native code called abort()');

  var nowIsMonotonic = 1;
  var __emscripten_get_now_is_monotonic = () => nowIsMonotonic;

  var __emscripten_init_main_thread_js = (tb) => {
      // Pass the thread address to the native code where they stored in wasm
      // globals which act as a form of TLS. Global constructors trying
      // to access this value will read the wrong value, but that is UB anyway.
      __emscripten_thread_init(
        tb,
        /*is_main=*/!ENVIRONMENT_IS_WORKER,
        /*is_runtime=*/1,
        /*can_block=*/!ENVIRONMENT_IS_WEB,
        /*default_stacksize=*/20971520,
        /*start_profiling=*/false,
      );
      PThread.threadInitTLS();
    };

  
  
  
  
  var maybeExit = () => {
      if (!keepRuntimeAlive()) {
        try {
          if (ENVIRONMENT_IS_PTHREAD) __emscripten_thread_exit(EXITSTATUS);
          else
          _exit(EXITSTATUS);
        } catch (e) {
          handleException(e);
        }
      }
    };
  var callUserCallback = (func) => {
      if (ABORT) {
        err('user callback triggered after runtime exited or application aborted.  Ignoring.');
        return;
      }
      try {
        func();
        maybeExit();
      } catch (e) {
        handleException(e);
      }
    };
  
  
  
  var __emscripten_thread_mailbox_await = (pthread_ptr) => {
      if (typeof Atomics.waitAsync === 'function') {
        // Wait on the pthread's initial self-pointer field because it is easy and
        // safe to access from sending threads that need to notify the waiting
        // thread.
        // TODO: How to make this work with wasm64?
        var wait = Atomics.waitAsync(HEAP32, ((pthread_ptr)>>2), pthread_ptr);
        assert(wait.async);
        wait.value.then(checkMailbox);
        var waitingAsync = pthread_ptr + 128;
        Atomics.store(HEAP32, ((waitingAsync)>>2), 1);
      }
      // If `Atomics.waitAsync` is not implemented, then we will always fall back
      // to postMessage and there is no need to do anything here.
    };
  
  var checkMailbox = () => {
      // Only check the mailbox if we have a live pthread runtime. We implement
      // pthread_self to return 0 if there is no live runtime.
      var pthread_ptr = _pthread_self();
      if (pthread_ptr) {
        // If we are using Atomics.waitAsync as our notification mechanism, wait
        // for a notification before processing the mailbox to avoid missing any
        // work that could otherwise arrive after we've finished processing the
        // mailbox and before we're ready for the next notification.
        __emscripten_thread_mailbox_await(pthread_ptr);
        callUserCallback(__emscripten_check_mailbox);
      }
    };
  
  var __emscripten_notify_mailbox_postmessage = (targetThread, currThreadId) => {
      if (targetThread == currThreadId) {
        setTimeout(checkMailbox);
      } else if (ENVIRONMENT_IS_PTHREAD) {
        postMessage({targetThread, cmd: 'checkMailbox'});
      } else {
        var worker = PThread.pthreads[targetThread];
        if (!worker) {
          err(`Cannot send message to thread with ID ${targetThread}, unknown thread ID!`);
          return;
        }
        worker.postMessage({cmd: 'checkMailbox'});
      }
    };

  
  var proxiedJSCallArgs = [];
  
  var __emscripten_receive_on_main_thread_js = (funcIndex, emAsmAddr, callingThread, numCallArgs, args) => {
      // Sometimes we need to backproxy events to the calling thread (e.g.
      // HTML5 DOM events handlers such as
      // emscripten_set_mousemove_callback()), so keep track in a globally
      // accessible variable about the thread that initiated the proxying.
      numCallArgs /= 2;
      proxiedJSCallArgs.length = numCallArgs;
      var b = ((args)>>3);
      for (var i = 0; i < numCallArgs; i++) {
        if (HEAP64[b + 2*i]) {
          // It's a BigInt.
          proxiedJSCallArgs[i] = HEAP64[b + 2*i + 1];
        } else {
          // It's a Number.
          proxiedJSCallArgs[i] = HEAPF64[b + 2*i + 1];
        }
      }
      // Proxied JS library funcs use funcIndex and EM_ASM functions use emAsmAddr
      var func = emAsmAddr ? ASM_CONSTS[emAsmAddr] : proxiedFunctionTable[funcIndex];
      assert(!(funcIndex && emAsmAddr));
      assert(func.length == numCallArgs, 'Call args mismatch in _emscripten_receive_on_main_thread_js');
      PThread.currentProxiedOperationCallerThread = callingThread;
      var rtn = func(...proxiedJSCallArgs);
      PThread.currentProxiedOperationCallerThread = 0;
      // Proxied functions can return any type except bigint.  All other types
      // cooerce to f64/double (the return type of this function in C) but not
      // bigint.
      assert(typeof rtn != "bigint");
      return rtn;
    };

  var __emscripten_runtime_keepalive_clear = () => {
      noExitRuntime = false;
      runtimeKeepaliveCounter = 0;
    };

  var __emscripten_thread_cleanup = (thread) => {
      // Called when a thread needs to be cleaned up so it can be reused.
      // A thread is considered reusable when it either returns from its
      // entry point, calls pthread_exit, or acts upon a cancellation.
      // Detached threads are responsible for calling this themselves,
      // otherwise pthread_join is responsible for calling this.
      if (!ENVIRONMENT_IS_PTHREAD) cleanupThread(thread);
      else postMessage({ cmd: 'cleanupThread', thread });
    };


  var __emscripten_thread_set_strongref = (thread) => {
      // Called when a thread needs to be strongly referenced.
      // Currently only used for:
      // - keeping the "main" thread alive in PROXY_TO_PTHREAD mode;
      // - crashed threads that needs to propagate the uncaught exception
      //   back to the main thread.
      if (ENVIRONMENT_IS_NODE) {
        PThread.pthreads[thread].ref();
      }
    };

  var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
      assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    };
  
  var __tzset_js = (timezone, daylight, std_name, dst_name) => {
      // TODO: Use (malleable) environment variables instead of system settings.
      var currentYear = new Date().getFullYear();
      var winter = new Date(currentYear, 0, 1);
      var summer = new Date(currentYear, 6, 1);
      var winterOffset = winter.getTimezoneOffset();
      var summerOffset = summer.getTimezoneOffset();
  
      // Local standard timezone offset. Local standard time is not adjusted for
      // daylight savings.  This code uses the fact that getTimezoneOffset returns
      // a greater value during Standard Time versus Daylight Saving Time (DST).
      // Thus it determines the expected output during Standard Time, and it
      // compares whether the output of the given date the same (Standard) or less
      // (DST).
      var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
  
      // timezone is specified as seconds west of UTC ("The external variable
      // `timezone` shall be set to the difference, in seconds, between
      // Coordinated Universal Time (UTC) and local standard time."), the same
      // as returned by stdTimezoneOffset.
      // See http://pubs.opengroup.org/onlinepubs/009695399/functions/tzset.html
      HEAPU32[((timezone)>>2)] = stdTimezoneOffset * 60;
  
      HEAP32[((daylight)>>2)] = Number(winterOffset != summerOffset);
  
      var extractZone = (timezoneOffset) => {
        // Why inverse sign?
        // Read here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset
        var sign = timezoneOffset >= 0 ? "-" : "+";
  
        var absOffset = Math.abs(timezoneOffset)
        var hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
        var minutes = String(absOffset % 60).padStart(2, "0");
  
        return `UTC${sign}${hours}${minutes}`;
      }
  
      var winterName = extractZone(winterOffset);
      var summerName = extractZone(summerOffset);
      assert(winterName);
      assert(summerName);
      assert(lengthBytesUTF8(winterName) <= 16, `timezone name truncated to fit in TZNAME_MAX (${winterName})`);
      assert(lengthBytesUTF8(summerName) <= 16, `timezone name truncated to fit in TZNAME_MAX (${summerName})`);
      if (summerOffset < winterOffset) {
        // Northern hemisphere
        stringToUTF8(winterName, std_name, 17);
        stringToUTF8(summerName, dst_name, 17);
      } else {
        stringToUTF8(winterName, dst_name, 17);
        stringToUTF8(summerName, std_name, 17);
      }
    };

  var readEmAsmArgsArray = [];
  var readEmAsmArgs = (sigPtr, buf) => {
      // Nobody should have mutated _readEmAsmArgsArray underneath us to be something else than an array.
      assert(Array.isArray(readEmAsmArgsArray));
      // The input buffer is allocated on the stack, so it must be stack-aligned.
      assert(buf % 16 == 0);
      readEmAsmArgsArray.length = 0;
      var ch;
      // Most arguments are i32s, so shift the buffer pointer so it is a plain
      // index into HEAP32.
      while (ch = HEAPU8[sigPtr++]) {
        var chr = String.fromCharCode(ch);
        var validChars = ['d', 'f', 'i', 'p'];
        // In WASM_BIGINT mode we support passing i64 values as bigint.
        validChars.push('j');
        assert(validChars.includes(chr), `Invalid character ${ch}("${chr}") in readEmAsmArgs! Use only [${validChars}], and do not specify "v" for void return argument.`);
        // Floats are always passed as doubles, so all types except for 'i'
        // are 8 bytes and require alignment.
        var wide = (ch != 105);
        wide &= (ch != 112);
        buf += wide && (buf % 8) ? 4 : 0;
        readEmAsmArgsArray.push(
          // Special case for pointers under wasm64 or CAN_ADDRESS_2GB mode.
          ch == 112 ? HEAPU32[((buf)>>2)] :
          ch == 106 ? HEAP64[((buf)>>3)] :
          ch == 105 ?
            HEAP32[((buf)>>2)] :
            HEAPF64[((buf)>>3)]
        );
        buf += wide ? 8 : 4;
      }
      return readEmAsmArgsArray;
    };
  
  var runMainThreadEmAsm = (emAsmAddr, sigPtr, argbuf, sync) => {
      var args = readEmAsmArgs(sigPtr, argbuf);
      if (ENVIRONMENT_IS_PTHREAD) {
        // EM_ASM functions are variadic, receiving the actual arguments as a buffer
        // in memory. the last parameter (argBuf) points to that data. We need to
        // always un-variadify that, *before proxying*, as in the async case this
        // is a stack allocation that LLVM made, which may go away before the main
        // thread gets the message. For that reason we handle proxying *after* the
        // call to readEmAsmArgs, and therefore we do that manually here instead
        // of using __proxy. (And dor simplicity, do the same in the sync
        // case as well, even though it's not strictly necessary, to keep the two
        // code paths as similar as possible on both sides.)
        return proxyToMainThread(0, emAsmAddr, sync, ...args);
      }
      assert(ASM_CONSTS.hasOwnProperty(emAsmAddr), `No EM_ASM constant found at address ${emAsmAddr}.  The loaded WebAssembly file is likely out of sync with the generated JavaScript.`);
      return ASM_CONSTS[emAsmAddr](...args);
    };
  var _emscripten_asm_const_async_on_main_thread = (emAsmAddr, sigPtr, argbuf) => runMainThreadEmAsm(emAsmAddr, sigPtr, argbuf, 0);

  var runEmAsmFunction = (code, sigPtr, argbuf) => {
      var args = readEmAsmArgs(sigPtr, argbuf);
      assert(ASM_CONSTS.hasOwnProperty(code), `No EM_ASM constant found at address ${code}.  The loaded WebAssembly file is likely out of sync with the generated JavaScript.`);
      return ASM_CONSTS[code](...args);
    };
  var _emscripten_asm_const_int = (code, sigPtr, argbuf) => {
      return runEmAsmFunction(code, sigPtr, argbuf);
    };

  
  var _emscripten_check_blocking_allowed = () => {
      if (ENVIRONMENT_IS_NODE) return;
  
      if (ENVIRONMENT_IS_WORKER) return; // Blocking in a worker/pthread is fine.
  
      warnOnce('Blocking on the main thread is very dangerous, see https://emscripten.org/docs/porting/pthreads.html#blocking-on-the-main-browser-thread');
  
    };

  var _emscripten_date_now = () => Date.now();

  var runtimeKeepalivePush = () => {
      runtimeKeepaliveCounter += 1;
    };
  var _emscripten_exit_with_live_runtime = () => {
      runtimeKeepalivePush();
      throw 'unwind';
    };

  var _emscripten_get_now = () => performance.timeOrigin + performance.now();

  var getHeapMax = () =>
      HEAPU8.length;
  
  
  var abortOnCannotGrowMemory = (requestedSize) => {
      abort(`Cannot enlarge memory arrays to size ${requestedSize} bytes (OOM). Either (1) compile with -sINITIAL_MEMORY=X with X higher than the current value ${HEAP8.length}, (2) compile with -sALLOW_MEMORY_GROWTH which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with -sABORTING_MALLOC=0`);
    };
  var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      requestedSize >>>= 0;
      abortOnCannotGrowMemory(requestedSize);
    };

  var ENV = {
  };
  
  var getExecutableName = () => thisProgram || './this.program';
  var getEnvStrings = () => {
      if (!getEnvStrings.strings) {
        // Default values.
        // Browser language detection #8751
        var lang = ((typeof navigator == 'object' && navigator.languages && navigator.languages[0]) || 'C').replace('-', '_') + '.UTF-8';
        var env = {
          'USER': 'web_user',
          'LOGNAME': 'web_user',
          'PATH': '/',
          'PWD': '/',
          'HOME': '/home/web_user',
          'LANG': lang,
          '_': getExecutableName()
        };
        // Apply the user-provided values, if any.
        for (var x in ENV) {
          // x is a key in ENV; if ENV[x] is undefined, that means it was
          // explicitly set to be so. We allow user code to do that to
          // force variables with default values to remain unset.
          if (ENV[x] === undefined) delete env[x];
          else env[x] = ENV[x];
        }
        var strings = [];
        for (var x in env) {
          strings.push(`${x}=${env[x]}`);
        }
        getEnvStrings.strings = strings;
      }
      return getEnvStrings.strings;
    };
  
  var stringToAscii = (str, buffer) => {
      for (var i = 0; i < str.length; ++i) {
        assert(str.charCodeAt(i) === (str.charCodeAt(i) & 0xff));
        HEAP8[buffer++] = str.charCodeAt(i);
      }
      // Null-terminate the string
      HEAP8[buffer] = 0;
    };
  
  var _environ_get = 
  function(__environ, environ_buf) {
  if (ENVIRONMENT_IS_PTHREAD)
    return proxyToMainThread(6, 0, 1, __environ, environ_buf);
  
      var bufSize = 0;
      getEnvStrings().forEach((string, i) => {
        var ptr = environ_buf + bufSize;
        HEAPU32[(((__environ)+(i*4))>>2)] = ptr;
        stringToAscii(string, ptr);
        bufSize += string.length + 1;
      });
      return 0;
    
  }
  ;

  
  var _environ_sizes_get = 
  function(penviron_count, penviron_buf_size) {
  if (ENVIRONMENT_IS_PTHREAD)
    return proxyToMainThread(7, 0, 1, penviron_count, penviron_buf_size);
  
      var strings = getEnvStrings();
      HEAPU32[((penviron_count)>>2)] = strings.length;
      var bufSize = 0;
      strings.forEach((string) => bufSize += string.length + 1);
      HEAPU32[((penviron_buf_size)>>2)] = bufSize;
      return 0;
    
  }
  ;


  
  
  function _fd_close(fd) {
  if (ENVIRONMENT_IS_PTHREAD)
    return proxyToMainThread(8, 0, 1, fd);
  
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.close(stream);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  
  }
  

  /** @param {number=} offset */
  var doReadv = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        var curr = FS.read(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (curr < len) break; // nothing more to read
        if (typeof offset != 'undefined') {
          offset += curr;
        }
      }
      return ret;
    };
  
  
  
  function _fd_read(fd, iov, iovcnt, pnum) {
  if (ENVIRONMENT_IS_PTHREAD)
    return proxyToMainThread(9, 0, 1, fd, iov, iovcnt, pnum);
  
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doReadv(stream, iov, iovcnt);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  
  }
  

  
  
  
  function _fd_seek(fd, offset, whence, newOffset) {
  if (ENVIRONMENT_IS_PTHREAD)
    return proxyToMainThread(10, 0, 1, fd, offset, whence, newOffset);
  
    offset = bigintToI53Checked(offset);
  
    
  try {
  
      if (isNaN(offset)) return 61;
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.llseek(stream, offset, whence);
      HEAP64[((newOffset)>>3)] = BigInt(stream.position);
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  ;
  
  }
  

  /** @param {number=} offset */
  var doWritev = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        var curr = FS.write(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (curr < len) {
          // No more space to write.
          break;
        }
        if (typeof offset != 'undefined') {
          offset += curr;
        }
      }
      return ret;
    };
  
  
  
  function _fd_write(fd, iov, iovcnt, pnum) {
  if (ENVIRONMENT_IS_PTHREAD)
    return proxyToMainThread(11, 0, 1, fd, iov, iovcnt, pnum);
  
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doWritev(stream, iov, iovcnt);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  
  }
  

  var _llvm_eh_typeid_for = (type) => type;




  var getCFunc = (ident) => {
      var func = Module['_' + ident]; // closure exported function
      assert(func, 'Cannot call unknown function ' + ident + ', make sure it is exported');
      return func;
    };
  
  var writeArrayToMemory = (array, buffer) => {
      assert(array.length >= 0, 'writeArrayToMemory array must have a length (should be an array or typed array)')
      HEAP8.set(array, buffer);
    };
  
  
  
  var stringToUTF8OnStack = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = stackAlloc(size);
      stringToUTF8(str, ret, size);
      return ret;
    };
  
  
  
  
  
    /**
     * @param {string|null=} returnType
     * @param {Array=} argTypes
     * @param {Arguments|Array=} args
     * @param {Object=} opts
     */
  var ccall = (ident, returnType, argTypes, args, opts) => {
      // For fast lookup of conversion functions
      var toC = {
        'string': (str) => {
          var ret = 0;
          if (str !== null && str !== undefined && str !== 0) { // null string
            ret = stringToUTF8OnStack(str);
          }
          return ret;
        },
        'array': (arr) => {
          var ret = stackAlloc(arr.length);
          writeArrayToMemory(arr, ret);
          return ret;
        }
      };
  
      function convertReturnValue(ret) {
        if (returnType === 'string') {
          return UTF8ToString(ret);
        }
        if (returnType === 'boolean') return Boolean(ret);
        return ret;
      }
  
      var func = getCFunc(ident);
      var cArgs = [];
      var stack = 0;
      assert(returnType !== 'array', 'Return type should not be "array".');
      if (args) {
        for (var i = 0; i < args.length; i++) {
          var converter = toC[argTypes[i]];
          if (converter) {
            if (stack === 0) stack = stackSave();
            cArgs[i] = converter(args[i]);
          } else {
            cArgs[i] = args[i];
          }
        }
      }
      var ret = func(...cArgs);
      function onDone(ret) {
        if (stack !== 0) stackRestore(stack);
        return convertReturnValue(ret);
      }
  
      ret = onDone(ret);
      return ret;
    };




  var incrementExceptionRefcount = (ptr) => ___cxa_increment_exception_refcount(ptr);
  Module['incrementExceptionRefcount'] = incrementExceptionRefcount;

  var decrementExceptionRefcount = (ptr) => ___cxa_decrement_exception_refcount(ptr);
  Module['decrementExceptionRefcount'] = decrementExceptionRefcount;

  
  
  
  
  
  var getExceptionMessageCommon = (ptr) => {
      var sp = stackSave();
      var type_addr_addr = stackAlloc(4);
      var message_addr_addr = stackAlloc(4);
      ___get_exception_message(ptr, type_addr_addr, message_addr_addr);
      var type_addr = HEAPU32[((type_addr_addr)>>2)];
      var message_addr = HEAPU32[((message_addr_addr)>>2)];
      var type = UTF8ToString(type_addr);
      _free(type_addr);
      var message;
      if (message_addr) {
        message = UTF8ToString(message_addr);
        _free(message_addr);
      }
      stackRestore(sp);
      return [type, message];
    };
  var getExceptionMessage = (ptr) => getExceptionMessageCommon(ptr);
  Module['getExceptionMessage'] = getExceptionMessage;
PThread.init();;

  FS.createPreloadedFile = FS_createPreloadedFile;
  FS.staticInit();
  // Set module methods based on EXPORTED_RUNTIME_METHODS
  ;

// proxiedFunctionTable specifies the list of functions that can be called
// either synchronously or asynchronously from other threads in postMessage()d
// or internally queued events. This way a pthread in a Worker can synchronously
// access e.g. the DOM on the main thread.
var proxiedFunctionTable = [
  _proc_exit,
  exitOnMainThread,
  pthreadCreateProxied,
  ___syscall_fcntl64,
  ___syscall_ioctl,
  ___syscall_openat,
  _environ_get,
  _environ_sizes_get,
  _fd_close,
  _fd_read,
  _fd_seek,
  _fd_write
];

function checkIncomingModuleAPI() {
  ignoredModuleProp('fetchSettings');
}
var wasmImports;
function assignWasmImports() {
  wasmImports = {
    /** @export */
    __assert_fail: ___assert_fail,
    /** @export */
    __call_sighandler: ___call_sighandler,
    /** @export */
    __cxa_begin_catch: ___cxa_begin_catch,
    /** @export */
    __cxa_end_catch: ___cxa_end_catch,
    /** @export */
    __cxa_find_matching_catch_2: ___cxa_find_matching_catch_2,
    /** @export */
    __cxa_find_matching_catch_3: ___cxa_find_matching_catch_3,
    /** @export */
    __cxa_find_matching_catch_4: ___cxa_find_matching_catch_4,
    /** @export */
    __cxa_find_matching_catch_7: ___cxa_find_matching_catch_7,
    /** @export */
    __cxa_find_matching_catch_8: ___cxa_find_matching_catch_8,
    /** @export */
    __cxa_rethrow: ___cxa_rethrow,
    /** @export */
    __cxa_throw: ___cxa_throw,
    /** @export */
    __cxa_uncaught_exceptions: ___cxa_uncaught_exceptions,
    /** @export */
    __pthread_create_js: ___pthread_create_js,
    /** @export */
    __resumeException: ___resumeException,
    /** @export */
    __syscall_fcntl64: ___syscall_fcntl64,
    /** @export */
    __syscall_ioctl: ___syscall_ioctl,
    /** @export */
    __syscall_openat: ___syscall_openat,
    /** @export */
    _abort_js: __abort_js,
    /** @export */
    _emscripten_get_now_is_monotonic: __emscripten_get_now_is_monotonic,
    /** @export */
    _emscripten_init_main_thread_js: __emscripten_init_main_thread_js,
    /** @export */
    _emscripten_notify_mailbox_postmessage: __emscripten_notify_mailbox_postmessage,
    /** @export */
    _emscripten_receive_on_main_thread_js: __emscripten_receive_on_main_thread_js,
    /** @export */
    _emscripten_runtime_keepalive_clear: __emscripten_runtime_keepalive_clear,
    /** @export */
    _emscripten_thread_cleanup: __emscripten_thread_cleanup,
    /** @export */
    _emscripten_thread_mailbox_await: __emscripten_thread_mailbox_await,
    /** @export */
    _emscripten_thread_set_strongref: __emscripten_thread_set_strongref,
    /** @export */
    _tzset_js: __tzset_js,
    /** @export */
    emscripten_asm_const_async_on_main_thread: _emscripten_asm_const_async_on_main_thread,
    /** @export */
    emscripten_asm_const_int: _emscripten_asm_const_int,
    /** @export */
    emscripten_check_blocking_allowed: _emscripten_check_blocking_allowed,
    /** @export */
    emscripten_date_now: _emscripten_date_now,
    /** @export */
    emscripten_exit_with_live_runtime: _emscripten_exit_with_live_runtime,
    /** @export */
    emscripten_get_now: _emscripten_get_now,
    /** @export */
    emscripten_resize_heap: _emscripten_resize_heap,
    /** @export */
    environ_get: _environ_get,
    /** @export */
    environ_sizes_get: _environ_sizes_get,
    /** @export */
    exit: _exit,
    /** @export */
    fd_close: _fd_close,
    /** @export */
    fd_read: _fd_read,
    /** @export */
    fd_seek: _fd_seek,
    /** @export */
    fd_write: _fd_write,
    /** @export */
    invoke_di,
    /** @export */
    invoke_dii,
    /** @export */
    invoke_diid,
    /** @export */
    invoke_diii,
    /** @export */
    invoke_diiid,
    /** @export */
    invoke_fii,
    /** @export */
    invoke_fiii,
    /** @export */
    invoke_i,
    /** @export */
    invoke_id,
    /** @export */
    invoke_ii,
    /** @export */
    invoke_iid,
    /** @export */
    invoke_iii,
    /** @export */
    invoke_iiid,
    /** @export */
    invoke_iiii,
    /** @export */
    invoke_iiiif,
    /** @export */
    invoke_iiiii,
    /** @export */
    invoke_iiiiid,
    /** @export */
    invoke_iiiiii,
    /** @export */
    invoke_iiiiiii,
    /** @export */
    invoke_iiiiiiii,
    /** @export */
    invoke_iiiiiiiii,
    /** @export */
    invoke_iiiiiiiiii,
    /** @export */
    invoke_iiiiiiiiiii,
    /** @export */
    invoke_iiiiiiiiiiii,
    /** @export */
    invoke_iiiiiiiiiiiii,
    /** @export */
    invoke_iiiiiiiiiiiiii,
    /** @export */
    invoke_iiiiij,
    /** @export */
    invoke_iiij,
    /** @export */
    invoke_iij,
    /** @export */
    invoke_iiji,
    /** @export */
    invoke_iijii,
    /** @export */
    invoke_j,
    /** @export */
    invoke_ji,
    /** @export */
    invoke_jii,
    /** @export */
    invoke_jiiii,
    /** @export */
    invoke_jiij,
    /** @export */
    invoke_v,
    /** @export */
    invoke_vi,
    /** @export */
    invoke_vid,
    /** @export */
    invoke_vidi,
    /** @export */
    invoke_vifi,
    /** @export */
    invoke_vii,
    /** @export */
    invoke_viid,
    /** @export */
    invoke_viidi,
    /** @export */
    invoke_viii,
    /** @export */
    invoke_viiid,
    /** @export */
    invoke_viiii,
    /** @export */
    invoke_viiiid,
    /** @export */
    invoke_viiiif,
    /** @export */
    invoke_viiiii,
    /** @export */
    invoke_viiiiii,
    /** @export */
    invoke_viiiiiii,
    /** @export */
    invoke_viiiiiiii,
    /** @export */
    invoke_viiiiiiiii,
    /** @export */
    invoke_viiiiiiiiii,
    /** @export */
    invoke_viiiiiiiiiii,
    /** @export */
    invoke_viiiiiiiiiiii,
    /** @export */
    invoke_viiiiiiiiiiiii,
    /** @export */
    invoke_viiiiiiiiiiiiiii,
    /** @export */
    invoke_viiiiiji,
    /** @export */
    invoke_viiiiijj,
    /** @export */
    invoke_viij,
    /** @export */
    invoke_viiji,
    /** @export */
    invoke_viijji,
    /** @export */
    invoke_vij,
    /** @export */
    invoke_viji,
    /** @export */
    invoke_vijj,
    /** @export */
    llvm_eh_typeid_for: _llvm_eh_typeid_for,
    /** @export */
    memory: wasmMemory,
    /** @export */
    proc_exit: _proc_exit
  };
}
var wasmExports = createWasm();
var ___wasm_call_ctors = createExportWrapper('__wasm_call_ctors', 0);
var _Z3_get_error_msg = Module['_Z3_get_error_msg'] = createExportWrapper('Z3_get_error_msg', 2);
var ___cxa_free_exception = createExportWrapper('__cxa_free_exception', 1);
var _set_throwy_error_handler = Module['_set_throwy_error_handler'] = createExportWrapper('set_throwy_error_handler', 1);
var _set_noop_error_handler = Module['_set_noop_error_handler'] = createExportWrapper('set_noop_error_handler', 1);
var _async_Z3_eval_smtlib2_string = Module['_async_Z3_eval_smtlib2_string'] = createExportWrapper('async_Z3_eval_smtlib2_string', 2);
var _async_Z3_simplify = Module['_async_Z3_simplify'] = createExportWrapper('async_Z3_simplify', 2);
var _async_Z3_simplify_ex = Module['_async_Z3_simplify_ex'] = createExportWrapper('async_Z3_simplify_ex', 3);
var _async_Z3_solver_check = Module['_async_Z3_solver_check'] = createExportWrapper('async_Z3_solver_check', 2);
var _async_Z3_solver_check_assumptions = Module['_async_Z3_solver_check_assumptions'] = createExportWrapper('async_Z3_solver_check_assumptions', 4);
var _async_Z3_solver_cube = Module['_async_Z3_solver_cube'] = createExportWrapper('async_Z3_solver_cube', 4);
var _async_Z3_solver_get_consequences = Module['_async_Z3_solver_get_consequences'] = createExportWrapper('async_Z3_solver_get_consequences', 5);
var _async_Z3_tactic_apply = Module['_async_Z3_tactic_apply'] = createExportWrapper('async_Z3_tactic_apply', 3);
var _async_Z3_tactic_apply_ex = Module['_async_Z3_tactic_apply_ex'] = createExportWrapper('async_Z3_tactic_apply_ex', 4);
var _async_Z3_optimize_check = Module['_async_Z3_optimize_check'] = createExportWrapper('async_Z3_optimize_check', 4);
var _async_Z3_algebraic_roots = Module['_async_Z3_algebraic_roots'] = createExportWrapper('async_Z3_algebraic_roots', 4);
var _async_Z3_algebraic_eval = Module['_async_Z3_algebraic_eval'] = createExportWrapper('async_Z3_algebraic_eval', 4);
var _async_Z3_fixedpoint_query = Module['_async_Z3_fixedpoint_query'] = createExportWrapper('async_Z3_fixedpoint_query', 3);
var _async_Z3_fixedpoint_query_relations = Module['_async_Z3_fixedpoint_query_relations'] = createExportWrapper('async_Z3_fixedpoint_query_relations', 4);
var _async_Z3_fixedpoint_query_from_lvl = Module['_async_Z3_fixedpoint_query_from_lvl'] = createExportWrapper('async_Z3_fixedpoint_query_from_lvl', 4);
var _async_Z3_polynomial_subresultants = Module['_async_Z3_polynomial_subresultants'] = createExportWrapper('async_Z3_polynomial_subresultants', 4);
var _Z3_eval_smtlib2_string = Module['_Z3_eval_smtlib2_string'] = createExportWrapper('Z3_eval_smtlib2_string', 2);
var _Z3_simplify = Module['_Z3_simplify'] = createExportWrapper('Z3_simplify', 2);
var _Z3_simplify_ex = Module['_Z3_simplify_ex'] = createExportWrapper('Z3_simplify_ex', 3);
var _Z3_solver_check = Module['_Z3_solver_check'] = createExportWrapper('Z3_solver_check', 2);
var _Z3_solver_check_assumptions = Module['_Z3_solver_check_assumptions'] = createExportWrapper('Z3_solver_check_assumptions', 4);
var _Z3_solver_cube = Module['_Z3_solver_cube'] = createExportWrapper('Z3_solver_cube', 4);
var _Z3_solver_get_consequences = Module['_Z3_solver_get_consequences'] = createExportWrapper('Z3_solver_get_consequences', 5);
var _Z3_tactic_apply = Module['_Z3_tactic_apply'] = createExportWrapper('Z3_tactic_apply', 3);
var _Z3_tactic_apply_ex = Module['_Z3_tactic_apply_ex'] = createExportWrapper('Z3_tactic_apply_ex', 4);
var _Z3_optimize_check = Module['_Z3_optimize_check'] = createExportWrapper('Z3_optimize_check', 4);
var _Z3_algebraic_roots = Module['_Z3_algebraic_roots'] = createExportWrapper('Z3_algebraic_roots', 4);
var _Z3_algebraic_eval = Module['_Z3_algebraic_eval'] = createExportWrapper('Z3_algebraic_eval', 4);
var _Z3_fixedpoint_query = Module['_Z3_fixedpoint_query'] = createExportWrapper('Z3_fixedpoint_query', 3);
var _Z3_fixedpoint_query_relations = Module['_Z3_fixedpoint_query_relations'] = createExportWrapper('Z3_fixedpoint_query_relations', 4);
var _Z3_fixedpoint_query_from_lvl = Module['_Z3_fixedpoint_query_from_lvl'] = createExportWrapper('Z3_fixedpoint_query_from_lvl', 4);
var _Z3_polynomial_subresultants = Module['_Z3_polynomial_subresultants'] = createExportWrapper('Z3_polynomial_subresultants', 4);
var _Z3_mk_linear_order = Module['_Z3_mk_linear_order'] = createExportWrapper('Z3_mk_linear_order', 3);
var _Z3_mk_partial_order = Module['_Z3_mk_partial_order'] = createExportWrapper('Z3_mk_partial_order', 3);
var _Z3_mk_piecewise_linear_order = Module['_Z3_mk_piecewise_linear_order'] = createExportWrapper('Z3_mk_piecewise_linear_order', 3);
var _Z3_mk_tree_order = Module['_Z3_mk_tree_order'] = createExportWrapper('Z3_mk_tree_order', 3);
var _Z3_mk_transitive_closure = Module['_Z3_mk_transitive_closure'] = createExportWrapper('Z3_mk_transitive_closure', 2);
var _Z3_mk_bv_sort = Module['_Z3_mk_bv_sort'] = createExportWrapper('Z3_mk_bv_sort', 2);
var _Z3_mk_bvnot = Module['_Z3_mk_bvnot'] = createExportWrapper('Z3_mk_bvnot', 2);
var _Z3_mk_bvredand = Module['_Z3_mk_bvredand'] = createExportWrapper('Z3_mk_bvredand', 2);
var _Z3_mk_bvredor = Module['_Z3_mk_bvredor'] = createExportWrapper('Z3_mk_bvredor', 2);
var _Z3_mk_bvand = Module['_Z3_mk_bvand'] = createExportWrapper('Z3_mk_bvand', 3);
var _Z3_mk_bvor = Module['_Z3_mk_bvor'] = createExportWrapper('Z3_mk_bvor', 3);
var _Z3_mk_bvxor = Module['_Z3_mk_bvxor'] = createExportWrapper('Z3_mk_bvxor', 3);
var _Z3_mk_bvnand = Module['_Z3_mk_bvnand'] = createExportWrapper('Z3_mk_bvnand', 3);
var _Z3_mk_bvnor = Module['_Z3_mk_bvnor'] = createExportWrapper('Z3_mk_bvnor', 3);
var _Z3_mk_bvxnor = Module['_Z3_mk_bvxnor'] = createExportWrapper('Z3_mk_bvxnor', 3);
var _Z3_mk_bvadd = Module['_Z3_mk_bvadd'] = createExportWrapper('Z3_mk_bvadd', 3);
var _Z3_mk_bvmul = Module['_Z3_mk_bvmul'] = createExportWrapper('Z3_mk_bvmul', 3);
var _Z3_mk_bvudiv = Module['_Z3_mk_bvudiv'] = createExportWrapper('Z3_mk_bvudiv', 3);
var _Z3_mk_bvsdiv = Module['_Z3_mk_bvsdiv'] = createExportWrapper('Z3_mk_bvsdiv', 3);
var _Z3_mk_bvurem = Module['_Z3_mk_bvurem'] = createExportWrapper('Z3_mk_bvurem', 3);
var _Z3_mk_bvsrem = Module['_Z3_mk_bvsrem'] = createExportWrapper('Z3_mk_bvsrem', 3);
var _Z3_mk_bvsmod = Module['_Z3_mk_bvsmod'] = createExportWrapper('Z3_mk_bvsmod', 3);
var _Z3_mk_bvule = Module['_Z3_mk_bvule'] = createExportWrapper('Z3_mk_bvule', 3);
var _Z3_mk_bvsle = Module['_Z3_mk_bvsle'] = createExportWrapper('Z3_mk_bvsle', 3);
var _Z3_mk_bvuge = Module['_Z3_mk_bvuge'] = createExportWrapper('Z3_mk_bvuge', 3);
var _Z3_mk_bvsge = Module['_Z3_mk_bvsge'] = createExportWrapper('Z3_mk_bvsge', 3);
var _Z3_mk_bvult = Module['_Z3_mk_bvult'] = createExportWrapper('Z3_mk_bvult', 3);
var _Z3_mk_bvslt = Module['_Z3_mk_bvslt'] = createExportWrapper('Z3_mk_bvslt', 3);
var _Z3_mk_bvugt = Module['_Z3_mk_bvugt'] = createExportWrapper('Z3_mk_bvugt', 3);
var _Z3_mk_bvsgt = Module['_Z3_mk_bvsgt'] = createExportWrapper('Z3_mk_bvsgt', 3);
var _Z3_mk_concat = Module['_Z3_mk_concat'] = createExportWrapper('Z3_mk_concat', 3);
var _Z3_mk_bvshl = Module['_Z3_mk_bvshl'] = createExportWrapper('Z3_mk_bvshl', 3);
var _Z3_mk_bvlshr = Module['_Z3_mk_bvlshr'] = createExportWrapper('Z3_mk_bvlshr', 3);
var _Z3_mk_bvashr = Module['_Z3_mk_bvashr'] = createExportWrapper('Z3_mk_bvashr', 3);
var _Z3_mk_ext_rotate_left = Module['_Z3_mk_ext_rotate_left'] = createExportWrapper('Z3_mk_ext_rotate_left', 3);
var _Z3_mk_ext_rotate_right = Module['_Z3_mk_ext_rotate_right'] = createExportWrapper('Z3_mk_ext_rotate_right', 3);
var _Z3_mk_extract = Module['_Z3_mk_extract'] = createExportWrapper('Z3_mk_extract', 4);
var _Z3_mk_sign_ext = Module['_Z3_mk_sign_ext'] = createExportWrapper('Z3_mk_sign_ext', 3);
var _Z3_mk_zero_ext = Module['_Z3_mk_zero_ext'] = createExportWrapper('Z3_mk_zero_ext', 3);
var _Z3_mk_repeat = Module['_Z3_mk_repeat'] = createExportWrapper('Z3_mk_repeat', 3);
var _Z3_mk_bit2bool = Module['_Z3_mk_bit2bool'] = createExportWrapper('Z3_mk_bit2bool', 3);
var _Z3_mk_rotate_left = Module['_Z3_mk_rotate_left'] = createExportWrapper('Z3_mk_rotate_left', 3);
var _Z3_mk_rotate_right = Module['_Z3_mk_rotate_right'] = createExportWrapper('Z3_mk_rotate_right', 3);
var _Z3_mk_int2bv = Module['_Z3_mk_int2bv'] = createExportWrapper('Z3_mk_int2bv', 3);
var _Z3_mk_bv2int = Module['_Z3_mk_bv2int'] = createExportWrapper('Z3_mk_bv2int', 3);
var _Z3_get_bv_sort_size = Module['_Z3_get_bv_sort_size'] = createExportWrapper('Z3_get_bv_sort_size', 2);
var _Z3_mk_bvadd_no_overflow = Module['_Z3_mk_bvadd_no_overflow'] = createExportWrapper('Z3_mk_bvadd_no_overflow', 4);
var _Z3_mk_bvadd_no_underflow = Module['_Z3_mk_bvadd_no_underflow'] = createExportWrapper('Z3_mk_bvadd_no_underflow', 3);
var _Z3_mk_bvsub_no_overflow = Module['_Z3_mk_bvsub_no_overflow'] = createExportWrapper('Z3_mk_bvsub_no_overflow', 3);
var _Z3_mk_bvneg = Module['_Z3_mk_bvneg'] = createExportWrapper('Z3_mk_bvneg', 2);
var _Z3_mk_bvsub_no_underflow = Module['_Z3_mk_bvsub_no_underflow'] = createExportWrapper('Z3_mk_bvsub_no_underflow', 4);
var _Z3_mk_bvmul_no_overflow = Module['_Z3_mk_bvmul_no_overflow'] = createExportWrapper('Z3_mk_bvmul_no_overflow', 4);
var _Z3_mk_bvmul_no_underflow = Module['_Z3_mk_bvmul_no_underflow'] = createExportWrapper('Z3_mk_bvmul_no_underflow', 3);
var _Z3_mk_bvneg_no_overflow = Module['_Z3_mk_bvneg_no_overflow'] = createExportWrapper('Z3_mk_bvneg_no_overflow', 2);
var _Z3_mk_bvsdiv_no_overflow = Module['_Z3_mk_bvsdiv_no_overflow'] = createExportWrapper('Z3_mk_bvsdiv_no_overflow', 3);
var _Z3_mk_bvsub = Module['_Z3_mk_bvsub'] = createExportWrapper('Z3_mk_bvsub', 3);
var _Z3_stats_to_string = Module['_Z3_stats_to_string'] = createExportWrapper('Z3_stats_to_string', 2);
var _Z3_stats_inc_ref = Module['_Z3_stats_inc_ref'] = createExportWrapper('Z3_stats_inc_ref', 2);
var _Z3_stats_dec_ref = Module['_Z3_stats_dec_ref'] = createExportWrapper('Z3_stats_dec_ref', 2);
var _Z3_stats_size = Module['_Z3_stats_size'] = createExportWrapper('Z3_stats_size', 2);
var _Z3_stats_get_key = Module['_Z3_stats_get_key'] = createExportWrapper('Z3_stats_get_key', 3);
var _Z3_stats_is_uint = Module['_Z3_stats_is_uint'] = createExportWrapper('Z3_stats_is_uint', 3);
var _Z3_stats_is_double = Module['_Z3_stats_is_double'] = createExportWrapper('Z3_stats_is_double', 3);
var _Z3_stats_get_uint_value = Module['_Z3_stats_get_uint_value'] = createExportWrapper('Z3_stats_get_uint_value', 3);
var _Z3_stats_get_double_value = Module['_Z3_stats_get_double_value'] = createExportWrapper('Z3_stats_get_double_value', 3);
var _Z3_get_estimated_alloc_size = Module['_Z3_get_estimated_alloc_size'] = createExportWrapper('Z3_get_estimated_alloc_size', 0);
var _Z3_mk_parser_context = Module['_Z3_mk_parser_context'] = createExportWrapper('Z3_mk_parser_context', 1);
var _Z3_parser_context_inc_ref = Module['_Z3_parser_context_inc_ref'] = createExportWrapper('Z3_parser_context_inc_ref', 2);
var _Z3_parser_context_dec_ref = Module['_Z3_parser_context_dec_ref'] = createExportWrapper('Z3_parser_context_dec_ref', 2);
var _Z3_parser_context_add_sort = Module['_Z3_parser_context_add_sort'] = createExportWrapper('Z3_parser_context_add_sort', 3);
var _Z3_parser_context_add_decl = Module['_Z3_parser_context_add_decl'] = createExportWrapper('Z3_parser_context_add_decl', 3);
var _Z3_parser_context_from_string = Module['_Z3_parser_context_from_string'] = createExportWrapper('Z3_parser_context_from_string', 3);
var _Z3_parse_smtlib2_string = Module['_Z3_parse_smtlib2_string'] = createExportWrapper('Z3_parse_smtlib2_string', 8);
var _Z3_parse_smtlib2_file = Module['_Z3_parse_smtlib2_file'] = createExportWrapper('Z3_parse_smtlib2_file', 8);
var _Z3_open_log = Module['_Z3_open_log'] = createExportWrapper('Z3_open_log', 1);
var _Z3_append_log = Module['_Z3_append_log'] = createExportWrapper('Z3_append_log', 1);
var _Z3_close_log = Module['_Z3_close_log'] = createExportWrapper('Z3_close_log', 0);
var _Z3_get_relation_arity = Module['_Z3_get_relation_arity'] = createExportWrapper('Z3_get_relation_arity', 2);
var _Z3_get_relation_column = Module['_Z3_get_relation_column'] = createExportWrapper('Z3_get_relation_column', 3);
var _Z3_mk_finite_domain_sort = Module['_Z3_mk_finite_domain_sort'] = createExportWrapper('Z3_mk_finite_domain_sort', 3);
var _Z3_get_finite_domain_sort_size = Module['_Z3_get_finite_domain_sort_size'] = createExportWrapper('Z3_get_finite_domain_sort_size', 3);
var _Z3_mk_fixedpoint = Module['_Z3_mk_fixedpoint'] = createExportWrapper('Z3_mk_fixedpoint', 1);
var _Z3_fixedpoint_inc_ref = Module['_Z3_fixedpoint_inc_ref'] = createExportWrapper('Z3_fixedpoint_inc_ref', 2);
var _Z3_fixedpoint_dec_ref = Module['_Z3_fixedpoint_dec_ref'] = createExportWrapper('Z3_fixedpoint_dec_ref', 2);
var _Z3_fixedpoint_assert = Module['_Z3_fixedpoint_assert'] = createExportWrapper('Z3_fixedpoint_assert', 3);
var _Z3_fixedpoint_add_rule = Module['_Z3_fixedpoint_add_rule'] = createExportWrapper('Z3_fixedpoint_add_rule', 4);
var _Z3_fixedpoint_add_fact = Module['_Z3_fixedpoint_add_fact'] = createExportWrapper('Z3_fixedpoint_add_fact', 5);
var _Z3_get_sort_kind = Module['_Z3_get_sort_kind'] = createExportWrapper('Z3_get_sort_kind', 2);
var _Z3_fixedpoint_get_answer = Module['_Z3_fixedpoint_get_answer'] = createExportWrapper('Z3_fixedpoint_get_answer', 2);
var _Z3_fixedpoint_get_reason_unknown = Module['_Z3_fixedpoint_get_reason_unknown'] = createExportWrapper('Z3_fixedpoint_get_reason_unknown', 2);
var _Z3_fixedpoint_to_string = Module['_Z3_fixedpoint_to_string'] = createExportWrapper('Z3_fixedpoint_to_string', 4);
var _Z3_fixedpoint_from_string = Module['_Z3_fixedpoint_from_string'] = createExportWrapper('Z3_fixedpoint_from_string', 3);
var _Z3_fixedpoint_from_file = Module['_Z3_fixedpoint_from_file'] = createExportWrapper('Z3_fixedpoint_from_file', 3);
var _Z3_fixedpoint_get_statistics = Module['_Z3_fixedpoint_get_statistics'] = createExportWrapper('Z3_fixedpoint_get_statistics', 2);
var _Z3_fixedpoint_register_relation = Module['_Z3_fixedpoint_register_relation'] = createExportWrapper('Z3_fixedpoint_register_relation', 3);
var _Z3_fixedpoint_set_predicate_representation = Module['_Z3_fixedpoint_set_predicate_representation'] = createExportWrapper('Z3_fixedpoint_set_predicate_representation', 5);
var _Z3_fixedpoint_get_rules = Module['_Z3_fixedpoint_get_rules'] = createExportWrapper('Z3_fixedpoint_get_rules', 2);
var _Z3_fixedpoint_get_assertions = Module['_Z3_fixedpoint_get_assertions'] = createExportWrapper('Z3_fixedpoint_get_assertions', 2);
var _Z3_fixedpoint_update_rule = Module['_Z3_fixedpoint_update_rule'] = createExportWrapper('Z3_fixedpoint_update_rule', 4);
var _Z3_fixedpoint_get_num_levels = Module['_Z3_fixedpoint_get_num_levels'] = createExportWrapper('Z3_fixedpoint_get_num_levels', 3);
var _Z3_fixedpoint_get_cover_delta = Module['_Z3_fixedpoint_get_cover_delta'] = createExportWrapper('Z3_fixedpoint_get_cover_delta', 4);
var _Z3_fixedpoint_add_cover = Module['_Z3_fixedpoint_add_cover'] = createExportWrapper('Z3_fixedpoint_add_cover', 5);
var _Z3_fixedpoint_get_help = Module['_Z3_fixedpoint_get_help'] = createExportWrapper('Z3_fixedpoint_get_help', 2);
var _Z3_fixedpoint_get_param_descrs = Module['_Z3_fixedpoint_get_param_descrs'] = createExportWrapper('Z3_fixedpoint_get_param_descrs', 2);
var _Z3_fixedpoint_set_params = Module['_Z3_fixedpoint_set_params'] = createExportWrapper('Z3_fixedpoint_set_params', 3);
var _Z3_fixedpoint_get_ground_sat_answer = Module['_Z3_fixedpoint_get_ground_sat_answer'] = createExportWrapper('Z3_fixedpoint_get_ground_sat_answer', 2);
var _Z3_fixedpoint_get_rules_along_trace = Module['_Z3_fixedpoint_get_rules_along_trace'] = createExportWrapper('Z3_fixedpoint_get_rules_along_trace', 2);
var _Z3_fixedpoint_get_rule_names_along_trace = Module['_Z3_fixedpoint_get_rule_names_along_trace'] = createExportWrapper('Z3_fixedpoint_get_rule_names_along_trace', 2);
var _Z3_fixedpoint_add_invariant = Module['_Z3_fixedpoint_add_invariant'] = createExportWrapper('Z3_fixedpoint_add_invariant', 4);
var _Z3_fixedpoint_get_reachable = Module['_Z3_fixedpoint_get_reachable'] = createExportWrapper('Z3_fixedpoint_get_reachable', 3);
var _Z3_mk_seq_sort = Module['_Z3_mk_seq_sort'] = createExportWrapper('Z3_mk_seq_sort', 2);
var _Z3_mk_re_sort = Module['_Z3_mk_re_sort'] = createExportWrapper('Z3_mk_re_sort', 2);
var _Z3_mk_string = Module['_Z3_mk_string'] = createExportWrapper('Z3_mk_string', 2);
var _Z3_mk_lstring = Module['_Z3_mk_lstring'] = createExportWrapper('Z3_mk_lstring', 3);
var _Z3_mk_u32string = Module['_Z3_mk_u32string'] = createExportWrapper('Z3_mk_u32string', 3);
var _Z3_mk_char = Module['_Z3_mk_char'] = createExportWrapper('Z3_mk_char', 2);
var _Z3_mk_string_sort = Module['_Z3_mk_string_sort'] = createExportWrapper('Z3_mk_string_sort', 1);
var _Z3_mk_char_sort = Module['_Z3_mk_char_sort'] = createExportWrapper('Z3_mk_char_sort', 1);
var _Z3_is_seq_sort = Module['_Z3_is_seq_sort'] = createExportWrapper('Z3_is_seq_sort', 2);
var _Z3_is_re_sort = Module['_Z3_is_re_sort'] = createExportWrapper('Z3_is_re_sort', 2);
var _Z3_get_seq_sort_basis = Module['_Z3_get_seq_sort_basis'] = createExportWrapper('Z3_get_seq_sort_basis', 2);
var _Z3_get_re_sort_basis = Module['_Z3_get_re_sort_basis'] = createExportWrapper('Z3_get_re_sort_basis', 2);
var _Z3_is_char_sort = Module['_Z3_is_char_sort'] = createExportWrapper('Z3_is_char_sort', 2);
var _Z3_is_string_sort = Module['_Z3_is_string_sort'] = createExportWrapper('Z3_is_string_sort', 2);
var _Z3_is_string = Module['_Z3_is_string'] = createExportWrapper('Z3_is_string', 2);
var _Z3_get_string = Module['_Z3_get_string'] = createExportWrapper('Z3_get_string', 2);
var _Z3_get_lstring = Module['_Z3_get_lstring'] = createExportWrapper('Z3_get_lstring', 3);
var _Z3_get_string_length = Module['_Z3_get_string_length'] = createExportWrapper('Z3_get_string_length', 2);
var _Z3_get_string_contents = Module['_Z3_get_string_contents'] = createExportWrapper('Z3_get_string_contents', 4);
var _Z3_mk_seq_empty = Module['_Z3_mk_seq_empty'] = createExportWrapper('Z3_mk_seq_empty', 2);
var _Z3_mk_seq_unit = Module['_Z3_mk_seq_unit'] = createExportWrapper('Z3_mk_seq_unit', 2);
var _Z3_mk_seq_concat = Module['_Z3_mk_seq_concat'] = createExportWrapper('Z3_mk_seq_concat', 3);
var _Z3_mk_seq_prefix = Module['_Z3_mk_seq_prefix'] = createExportWrapper('Z3_mk_seq_prefix', 3);
var _Z3_mk_seq_suffix = Module['_Z3_mk_seq_suffix'] = createExportWrapper('Z3_mk_seq_suffix', 3);
var _Z3_mk_seq_contains = Module['_Z3_mk_seq_contains'] = createExportWrapper('Z3_mk_seq_contains', 3);
var _Z3_mk_str_lt = Module['_Z3_mk_str_lt'] = createExportWrapper('Z3_mk_str_lt', 3);
var _Z3_mk_str_le = Module['_Z3_mk_str_le'] = createExportWrapper('Z3_mk_str_le', 3);
var _Z3_mk_string_to_code = Module['_Z3_mk_string_to_code'] = createExportWrapper('Z3_mk_string_to_code', 2);
var _Z3_mk_string_from_code = Module['_Z3_mk_string_from_code'] = createExportWrapper('Z3_mk_string_from_code', 2);
var _Z3_mk_seq_extract = Module['_Z3_mk_seq_extract'] = createExportWrapper('Z3_mk_seq_extract', 4);
var _Z3_mk_seq_replace = Module['_Z3_mk_seq_replace'] = createExportWrapper('Z3_mk_seq_replace', 4);
var _Z3_mk_seq_at = Module['_Z3_mk_seq_at'] = createExportWrapper('Z3_mk_seq_at', 3);
var _Z3_mk_seq_nth = Module['_Z3_mk_seq_nth'] = createExportWrapper('Z3_mk_seq_nth', 3);
var _Z3_mk_seq_length = Module['_Z3_mk_seq_length'] = createExportWrapper('Z3_mk_seq_length', 2);
var _Z3_mk_seq_index = Module['_Z3_mk_seq_index'] = createExportWrapper('Z3_mk_seq_index', 4);
var _Z3_mk_seq_last_index = Module['_Z3_mk_seq_last_index'] = createExportWrapper('Z3_mk_seq_last_index', 3);
var _Z3_mk_seq_to_re = Module['_Z3_mk_seq_to_re'] = createExportWrapper('Z3_mk_seq_to_re', 2);
var _Z3_mk_seq_in_re = Module['_Z3_mk_seq_in_re'] = createExportWrapper('Z3_mk_seq_in_re', 3);
var _Z3_mk_int_to_str = Module['_Z3_mk_int_to_str'] = createExportWrapper('Z3_mk_int_to_str', 2);
var _Z3_mk_str_to_int = Module['_Z3_mk_str_to_int'] = createExportWrapper('Z3_mk_str_to_int', 2);
var _Z3_mk_ubv_to_str = Module['_Z3_mk_ubv_to_str'] = createExportWrapper('Z3_mk_ubv_to_str', 2);
var _Z3_mk_sbv_to_str = Module['_Z3_mk_sbv_to_str'] = createExportWrapper('Z3_mk_sbv_to_str', 2);
var _Z3_mk_re_loop = Module['_Z3_mk_re_loop'] = createExportWrapper('Z3_mk_re_loop', 4);
var _Z3_mk_re_power = Module['_Z3_mk_re_power'] = createExportWrapper('Z3_mk_re_power', 3);
var _Z3_mk_re_plus = Module['_Z3_mk_re_plus'] = createExportWrapper('Z3_mk_re_plus', 2);
var _Z3_mk_re_star = Module['_Z3_mk_re_star'] = createExportWrapper('Z3_mk_re_star', 2);
var _Z3_mk_re_option = Module['_Z3_mk_re_option'] = createExportWrapper('Z3_mk_re_option', 2);
var _Z3_mk_re_complement = Module['_Z3_mk_re_complement'] = createExportWrapper('Z3_mk_re_complement', 2);
var _Z3_mk_re_diff = Module['_Z3_mk_re_diff'] = createExportWrapper('Z3_mk_re_diff', 3);
var _Z3_mk_re_union = Module['_Z3_mk_re_union'] = createExportWrapper('Z3_mk_re_union', 3);
var _Z3_mk_re_intersect = Module['_Z3_mk_re_intersect'] = createExportWrapper('Z3_mk_re_intersect', 3);
var _Z3_mk_re_concat = Module['_Z3_mk_re_concat'] = createExportWrapper('Z3_mk_re_concat', 3);
var _Z3_mk_re_range = Module['_Z3_mk_re_range'] = createExportWrapper('Z3_mk_re_range', 3);
var _Z3_mk_re_allchar = Module['_Z3_mk_re_allchar'] = createExportWrapper('Z3_mk_re_allchar', 2);
var _Z3_mk_re_empty = Module['_Z3_mk_re_empty'] = createExportWrapper('Z3_mk_re_empty', 2);
var _Z3_mk_re_full = Module['_Z3_mk_re_full'] = createExportWrapper('Z3_mk_re_full', 2);
var _Z3_mk_char_le = Module['_Z3_mk_char_le'] = createExportWrapper('Z3_mk_char_le', 3);
var _Z3_mk_char_to_int = Module['_Z3_mk_char_to_int'] = createExportWrapper('Z3_mk_char_to_int', 2);
var _Z3_mk_char_to_bv = Module['_Z3_mk_char_to_bv'] = createExportWrapper('Z3_mk_char_to_bv', 2);
var _Z3_mk_char_from_bv = Module['_Z3_mk_char_from_bv'] = createExportWrapper('Z3_mk_char_from_bv', 2);
var _Z3_mk_char_is_digit = Module['_Z3_mk_char_is_digit'] = createExportWrapper('Z3_mk_char_is_digit', 2);
var _Z3_mk_seq_map = Module['_Z3_mk_seq_map'] = createExportWrapper('Z3_mk_seq_map', 3);
var _Z3_mk_seq_mapi = Module['_Z3_mk_seq_mapi'] = createExportWrapper('Z3_mk_seq_mapi', 4);
var _Z3_mk_seq_foldl = Module['_Z3_mk_seq_foldl'] = createExportWrapper('Z3_mk_seq_foldl', 4);
var _Z3_mk_seq_foldli = Module['_Z3_mk_seq_foldli'] = createExportWrapper('Z3_mk_seq_foldli', 5);
var _Z3_mk_atmost = Module['_Z3_mk_atmost'] = createExportWrapper('Z3_mk_atmost', 4);
var _Z3_mk_atleast = Module['_Z3_mk_atleast'] = createExportWrapper('Z3_mk_atleast', 4);
var _Z3_mk_pble = Module['_Z3_mk_pble'] = createExportWrapper('Z3_mk_pble', 5);
var _Z3_mk_pbge = Module['_Z3_mk_pbge'] = createExportWrapper('Z3_mk_pbge', 5);
var _Z3_mk_pbeq = Module['_Z3_mk_pbeq'] = createExportWrapper('Z3_mk_pbeq', 5);
var _Z3_mk_array_sort = Module['_Z3_mk_array_sort'] = createExportWrapper('Z3_mk_array_sort', 3);
var _Z3_mk_array_sort_n = Module['_Z3_mk_array_sort_n'] = createExportWrapper('Z3_mk_array_sort_n', 4);
var _Z3_mk_select = Module['_Z3_mk_select'] = createExportWrapper('Z3_mk_select', 3);
var _Z3_mk_select_n = Module['_Z3_mk_select_n'] = createExportWrapper('Z3_mk_select_n', 4);
var _Z3_mk_store = Module['_Z3_mk_store'] = createExportWrapper('Z3_mk_store', 4);
var _Z3_mk_store_n = Module['_Z3_mk_store_n'] = createExportWrapper('Z3_mk_store_n', 5);
var _Z3_mk_map = Module['_Z3_mk_map'] = createExportWrapper('Z3_mk_map', 4);
var _Z3_mk_const_array = Module['_Z3_mk_const_array'] = createExportWrapper('Z3_mk_const_array', 3);
var _Z3_mk_array_default = Module['_Z3_mk_array_default'] = createExportWrapper('Z3_mk_array_default', 2);
var _Z3_mk_set_sort = Module['_Z3_mk_set_sort'] = createExportWrapper('Z3_mk_set_sort', 2);
var _Z3_mk_empty_set = Module['_Z3_mk_empty_set'] = createExportWrapper('Z3_mk_empty_set', 2);
var _Z3_mk_full_set = Module['_Z3_mk_full_set'] = createExportWrapper('Z3_mk_full_set', 2);
var _Z3_mk_set_union = Module['_Z3_mk_set_union'] = createExportWrapper('Z3_mk_set_union', 3);
var _Z3_mk_set_intersect = Module['_Z3_mk_set_intersect'] = createExportWrapper('Z3_mk_set_intersect', 3);
var _Z3_mk_set_difference = Module['_Z3_mk_set_difference'] = createExportWrapper('Z3_mk_set_difference', 3);
var _Z3_mk_set_complement = Module['_Z3_mk_set_complement'] = createExportWrapper('Z3_mk_set_complement', 2);
var _Z3_mk_set_subset = Module['_Z3_mk_set_subset'] = createExportWrapper('Z3_mk_set_subset', 3);
var _Z3_mk_array_ext = Module['_Z3_mk_array_ext'] = createExportWrapper('Z3_mk_array_ext', 3);
var _Z3_mk_set_has_size = Module['_Z3_mk_set_has_size'] = createExportWrapper('Z3_mk_set_has_size', 3);
var _Z3_mk_as_array = Module['_Z3_mk_as_array'] = createExportWrapper('Z3_mk_as_array', 2);
var _Z3_mk_set_member = Module['_Z3_mk_set_member'] = createExportWrapper('Z3_mk_set_member', 3);
var _Z3_mk_set_add = Module['_Z3_mk_set_add'] = createExportWrapper('Z3_mk_set_add', 3);
var _Z3_mk_set_del = Module['_Z3_mk_set_del'] = createExportWrapper('Z3_mk_set_del', 3);
var _Z3_get_array_arity = Module['_Z3_get_array_arity'] = createExportWrapper('Z3_get_array_arity', 2);
var _Z3_get_array_sort_domain = Module['_Z3_get_array_sort_domain'] = createExportWrapper('Z3_get_array_sort_domain', 2);
var _Z3_get_array_sort_domain_n = Module['_Z3_get_array_sort_domain_n'] = createExportWrapper('Z3_get_array_sort_domain_n', 3);
var _Z3_get_array_sort_range = Module['_Z3_get_array_sort_range'] = createExportWrapper('Z3_get_array_sort_range', 2);
var _Z3_mk_ast_map = Module['_Z3_mk_ast_map'] = createExportWrapper('Z3_mk_ast_map', 1);
var _Z3_ast_map_inc_ref = Module['_Z3_ast_map_inc_ref'] = createExportWrapper('Z3_ast_map_inc_ref', 2);
var _Z3_ast_map_dec_ref = Module['_Z3_ast_map_dec_ref'] = createExportWrapper('Z3_ast_map_dec_ref', 2);
var _Z3_ast_map_contains = Module['_Z3_ast_map_contains'] = createExportWrapper('Z3_ast_map_contains', 3);
var _Z3_ast_map_find = Module['_Z3_ast_map_find'] = createExportWrapper('Z3_ast_map_find', 3);
var _Z3_ast_map_insert = Module['_Z3_ast_map_insert'] = createExportWrapper('Z3_ast_map_insert', 4);
var _Z3_ast_map_reset = Module['_Z3_ast_map_reset'] = createExportWrapper('Z3_ast_map_reset', 2);
var _Z3_ast_map_erase = Module['_Z3_ast_map_erase'] = createExportWrapper('Z3_ast_map_erase', 3);
var _Z3_ast_map_size = Module['_Z3_ast_map_size'] = createExportWrapper('Z3_ast_map_size', 2);
var _Z3_ast_map_keys = Module['_Z3_ast_map_keys'] = createExportWrapper('Z3_ast_map_keys', 2);
var _Z3_ast_map_to_string = Module['_Z3_ast_map_to_string'] = createExportWrapper('Z3_ast_map_to_string', 2);
var _Z3_qe_model_project = Module['_Z3_qe_model_project'] = createExportWrapper('Z3_qe_model_project', 5);
var _Z3_qe_model_project_skolem = Module['_Z3_qe_model_project_skolem'] = createExportWrapper('Z3_qe_model_project_skolem', 6);
var _Z3_qe_model_project_with_witness = Module['_Z3_qe_model_project_with_witness'] = createExportWrapper('Z3_qe_model_project_with_witness', 6);
var _Z3_model_extrapolate = Module['_Z3_model_extrapolate'] = createExportWrapper('Z3_model_extrapolate', 3);
var _Z3_qe_lite = Module['_Z3_qe_lite'] = createExportWrapper('Z3_qe_lite', 3);
var _Z3_mk_optimize = Module['_Z3_mk_optimize'] = createExportWrapper('Z3_mk_optimize', 1);
var _Z3_optimize_inc_ref = Module['_Z3_optimize_inc_ref'] = createExportWrapper('Z3_optimize_inc_ref', 2);
var _Z3_optimize_dec_ref = Module['_Z3_optimize_dec_ref'] = createExportWrapper('Z3_optimize_dec_ref', 2);
var _Z3_optimize_assert = Module['_Z3_optimize_assert'] = createExportWrapper('Z3_optimize_assert', 3);
var _Z3_optimize_assert_and_track = Module['_Z3_optimize_assert_and_track'] = createExportWrapper('Z3_optimize_assert_and_track', 4);
var _Z3_optimize_assert_soft = Module['_Z3_optimize_assert_soft'] = createExportWrapper('Z3_optimize_assert_soft', 5);
var _Z3_optimize_maximize = Module['_Z3_optimize_maximize'] = createExportWrapper('Z3_optimize_maximize', 3);
var _Z3_optimize_minimize = Module['_Z3_optimize_minimize'] = createExportWrapper('Z3_optimize_minimize', 3);
var _Z3_optimize_push = Module['_Z3_optimize_push'] = createExportWrapper('Z3_optimize_push', 2);
var _Z3_optimize_pop = Module['_Z3_optimize_pop'] = createExportWrapper('Z3_optimize_pop', 2);
var _Z3_optimize_get_unsat_core = Module['_Z3_optimize_get_unsat_core'] = createExportWrapper('Z3_optimize_get_unsat_core', 2);
var _Z3_optimize_get_reason_unknown = Module['_Z3_optimize_get_reason_unknown'] = createExportWrapper('Z3_optimize_get_reason_unknown', 2);
var _Z3_optimize_get_model = Module['_Z3_optimize_get_model'] = createExportWrapper('Z3_optimize_get_model', 2);
var _Z3_optimize_set_params = Module['_Z3_optimize_set_params'] = createExportWrapper('Z3_optimize_set_params', 3);
var _Z3_optimize_get_param_descrs = Module['_Z3_optimize_get_param_descrs'] = createExportWrapper('Z3_optimize_get_param_descrs', 2);
var _Z3_optimize_get_lower = Module['_Z3_optimize_get_lower'] = createExportWrapper('Z3_optimize_get_lower', 3);
var _Z3_optimize_get_upper = Module['_Z3_optimize_get_upper'] = createExportWrapper('Z3_optimize_get_upper', 3);
var _Z3_optimize_get_lower_as_vector = Module['_Z3_optimize_get_lower_as_vector'] = createExportWrapper('Z3_optimize_get_lower_as_vector', 3);
var _Z3_optimize_get_upper_as_vector = Module['_Z3_optimize_get_upper_as_vector'] = createExportWrapper('Z3_optimize_get_upper_as_vector', 3);
var _Z3_optimize_to_string = Module['_Z3_optimize_to_string'] = createExportWrapper('Z3_optimize_to_string', 2);
var _Z3_optimize_get_help = Module['_Z3_optimize_get_help'] = createExportWrapper('Z3_optimize_get_help', 2);
var _Z3_optimize_get_statistics = Module['_Z3_optimize_get_statistics'] = createExportWrapper('Z3_optimize_get_statistics', 2);
var _Z3_optimize_from_string = Module['_Z3_optimize_from_string'] = createExportWrapper('Z3_optimize_from_string', 3);
var _Z3_optimize_from_file = Module['_Z3_optimize_from_file'] = createExportWrapper('Z3_optimize_from_file', 3);
var _Z3_optimize_get_assertions = Module['_Z3_optimize_get_assertions'] = createExportWrapper('Z3_optimize_get_assertions', 2);
var _Z3_optimize_get_objectives = Module['_Z3_optimize_get_objectives'] = createExportWrapper('Z3_optimize_get_objectives', 2);
var _Z3_optimize_set_initial_value = Module['_Z3_optimize_set_initial_value'] = createExportWrapper('Z3_optimize_set_initial_value', 4);
var _Z3_mk_tuple_sort = Module['_Z3_mk_tuple_sort'] = createExportWrapper('Z3_mk_tuple_sort', 7);
var _Z3_mk_enumeration_sort = Module['_Z3_mk_enumeration_sort'] = createExportWrapper('Z3_mk_enumeration_sort', 6);
var _Z3_mk_list_sort = Module['_Z3_mk_list_sort'] = createExportWrapper('Z3_mk_list_sort', 9);
var _Z3_mk_constructor = Module['_Z3_mk_constructor'] = createExportWrapper('Z3_mk_constructor', 7);
var _Z3_constructor_num_fields = Module['_Z3_constructor_num_fields'] = createExportWrapper('Z3_constructor_num_fields', 2);
var _Z3_query_constructor = Module['_Z3_query_constructor'] = createExportWrapper('Z3_query_constructor', 6);
var _Z3_del_constructor = Module['_Z3_del_constructor'] = createExportWrapper('Z3_del_constructor', 2);
var _Z3_mk_datatype = Module['_Z3_mk_datatype'] = createExportWrapper('Z3_mk_datatype', 4);
var _Z3_mk_constructor_list = Module['_Z3_mk_constructor_list'] = createExportWrapper('Z3_mk_constructor_list', 3);
var _Z3_del_constructor_list = Module['_Z3_del_constructor_list'] = createExportWrapper('Z3_del_constructor_list', 2);
var _Z3_mk_datatype_sort = Module['_Z3_mk_datatype_sort'] = createExportWrapper('Z3_mk_datatype_sort', 2);
var _Z3_mk_datatypes = Module['_Z3_mk_datatypes'] = createExportWrapper('Z3_mk_datatypes', 5);
var _Z3_is_recursive_datatype_sort = Module['_Z3_is_recursive_datatype_sort'] = createExportWrapper('Z3_is_recursive_datatype_sort', 2);
var _Z3_get_datatype_sort_num_constructors = Module['_Z3_get_datatype_sort_num_constructors'] = createExportWrapper('Z3_get_datatype_sort_num_constructors', 2);
var _Z3_get_datatype_sort_constructor = Module['_Z3_get_datatype_sort_constructor'] = createExportWrapper('Z3_get_datatype_sort_constructor', 3);
var _Z3_get_datatype_sort_recognizer = Module['_Z3_get_datatype_sort_recognizer'] = createExportWrapper('Z3_get_datatype_sort_recognizer', 3);
var _Z3_get_datatype_sort_constructor_accessor = Module['_Z3_get_datatype_sort_constructor_accessor'] = createExportWrapper('Z3_get_datatype_sort_constructor_accessor', 4);
var _Z3_get_tuple_sort_mk_decl = Module['_Z3_get_tuple_sort_mk_decl'] = createExportWrapper('Z3_get_tuple_sort_mk_decl', 2);
var _Z3_get_tuple_sort_num_fields = Module['_Z3_get_tuple_sort_num_fields'] = createExportWrapper('Z3_get_tuple_sort_num_fields', 2);
var _Z3_get_tuple_sort_field_decl = Module['_Z3_get_tuple_sort_field_decl'] = createExportWrapper('Z3_get_tuple_sort_field_decl', 3);
var _Z3_datatype_update_field = Module['_Z3_datatype_update_field'] = createExportWrapper('Z3_datatype_update_field', 4);
var _Z3_mk_model = Module['_Z3_mk_model'] = createExportWrapper('Z3_mk_model', 1);
var _Z3_model_inc_ref = Module['_Z3_model_inc_ref'] = createExportWrapper('Z3_model_inc_ref', 2);
var _Z3_model_dec_ref = Module['_Z3_model_dec_ref'] = createExportWrapper('Z3_model_dec_ref', 2);
var _Z3_model_get_const_interp = Module['_Z3_model_get_const_interp'] = createExportWrapper('Z3_model_get_const_interp', 3);
var _Z3_model_has_interp = Module['_Z3_model_has_interp'] = createExportWrapper('Z3_model_has_interp', 3);
var _Z3_model_get_func_interp = Module['_Z3_model_get_func_interp'] = createExportWrapper('Z3_model_get_func_interp', 3);
var _Z3_model_get_num_consts = Module['_Z3_model_get_num_consts'] = createExportWrapper('Z3_model_get_num_consts', 2);
var _Z3_model_get_const_decl = Module['_Z3_model_get_const_decl'] = createExportWrapper('Z3_model_get_const_decl', 3);
var _Z3_model_get_num_funcs = Module['_Z3_model_get_num_funcs'] = createExportWrapper('Z3_model_get_num_funcs', 2);
var _Z3_model_get_func_decl = Module['_Z3_model_get_func_decl'] = createExportWrapper('Z3_model_get_func_decl', 3);
var _Z3_model_eval = Module['_Z3_model_eval'] = createExportWrapper('Z3_model_eval', 5);
var _Z3_model_get_num_sorts = Module['_Z3_model_get_num_sorts'] = createExportWrapper('Z3_model_get_num_sorts', 2);
var _Z3_model_get_sort = Module['_Z3_model_get_sort'] = createExportWrapper('Z3_model_get_sort', 3);
var _Z3_model_get_sort_universe = Module['_Z3_model_get_sort_universe'] = createExportWrapper('Z3_model_get_sort_universe', 3);
var _Z3_model_translate = Module['_Z3_model_translate'] = createExportWrapper('Z3_model_translate', 3);
var _Z3_is_as_array = Module['_Z3_is_as_array'] = createExportWrapper('Z3_is_as_array', 2);
var _Z3_get_as_array_func_decl = Module['_Z3_get_as_array_func_decl'] = createExportWrapper('Z3_get_as_array_func_decl', 2);
var _Z3_add_func_interp = Module['_Z3_add_func_interp'] = createExportWrapper('Z3_add_func_interp', 4);
var _Z3_add_const_interp = Module['_Z3_add_const_interp'] = createExportWrapper('Z3_add_const_interp', 4);
var _Z3_func_interp_inc_ref = Module['_Z3_func_interp_inc_ref'] = createExportWrapper('Z3_func_interp_inc_ref', 2);
var _Z3_func_interp_dec_ref = Module['_Z3_func_interp_dec_ref'] = createExportWrapper('Z3_func_interp_dec_ref', 2);
var _Z3_func_interp_get_num_entries = Module['_Z3_func_interp_get_num_entries'] = createExportWrapper('Z3_func_interp_get_num_entries', 2);
var _Z3_func_interp_get_entry = Module['_Z3_func_interp_get_entry'] = createExportWrapper('Z3_func_interp_get_entry', 3);
var _Z3_func_interp_get_else = Module['_Z3_func_interp_get_else'] = createExportWrapper('Z3_func_interp_get_else', 2);
var _Z3_func_interp_set_else = Module['_Z3_func_interp_set_else'] = createExportWrapper('Z3_func_interp_set_else', 3);
var _Z3_func_interp_get_arity = Module['_Z3_func_interp_get_arity'] = createExportWrapper('Z3_func_interp_get_arity', 2);
var _Z3_func_interp_add_entry = Module['_Z3_func_interp_add_entry'] = createExportWrapper('Z3_func_interp_add_entry', 4);
var _Z3_func_entry_inc_ref = Module['_Z3_func_entry_inc_ref'] = createExportWrapper('Z3_func_entry_inc_ref', 2);
var _Z3_func_entry_dec_ref = Module['_Z3_func_entry_dec_ref'] = createExportWrapper('Z3_func_entry_dec_ref', 2);
var _Z3_func_entry_get_value = Module['_Z3_func_entry_get_value'] = createExportWrapper('Z3_func_entry_get_value', 2);
var _Z3_func_entry_get_num_args = Module['_Z3_func_entry_get_num_args'] = createExportWrapper('Z3_func_entry_get_num_args', 2);
var _Z3_func_entry_get_arg = Module['_Z3_func_entry_get_arg'] = createExportWrapper('Z3_func_entry_get_arg', 3);
var _Z3_model_to_string = Module['_Z3_model_to_string'] = createExportWrapper('Z3_model_to_string', 2);
var _Z3_mk_context = Module['_Z3_mk_context'] = createExportWrapper('Z3_mk_context', 1);
var _Z3_mk_context_rc = Module['_Z3_mk_context_rc'] = createExportWrapper('Z3_mk_context_rc', 1);
var _Z3_del_context = Module['_Z3_del_context'] = createExportWrapper('Z3_del_context', 1);
var _Z3_interrupt = Module['_Z3_interrupt'] = createExportWrapper('Z3_interrupt', 1);
var _Z3_enable_concurrent_dec_ref = Module['_Z3_enable_concurrent_dec_ref'] = createExportWrapper('Z3_enable_concurrent_dec_ref', 1);
var _Z3_toggle_warning_messages = Module['_Z3_toggle_warning_messages'] = createExportWrapper('Z3_toggle_warning_messages', 1);
var _Z3_inc_ref = Module['_Z3_inc_ref'] = createExportWrapper('Z3_inc_ref', 2);
var _Z3_dec_ref = Module['_Z3_dec_ref'] = createExportWrapper('Z3_dec_ref', 2);
var _Z3_get_version = Module['_Z3_get_version'] = createExportWrapper('Z3_get_version', 4);
var _Z3_get_full_version = Module['_Z3_get_full_version'] = createExportWrapper('Z3_get_full_version', 0);
var _Z3_enable_trace = Module['_Z3_enable_trace'] = createExportWrapper('Z3_enable_trace', 1);
var _Z3_disable_trace = Module['_Z3_disable_trace'] = createExportWrapper('Z3_disable_trace', 1);
var _Z3_reset_memory = Module['_Z3_reset_memory'] = createExportWrapper('Z3_reset_memory', 0);
var _Z3_finalize_memory = Module['_Z3_finalize_memory'] = createExportWrapper('Z3_finalize_memory', 0);
var _Z3_get_error_code = Module['_Z3_get_error_code'] = createExportWrapper('Z3_get_error_code', 1);
var _Z3_set_error = Module['_Z3_set_error'] = createExportWrapper('Z3_set_error', 2);
var _Z3_set_ast_print_mode = Module['_Z3_set_ast_print_mode'] = createExportWrapper('Z3_set_ast_print_mode', 2);
var _Z3_mk_int_symbol = Module['_Z3_mk_int_symbol'] = createExportWrapper('Z3_mk_int_symbol', 2);
var _Z3_mk_string_symbol = Module['_Z3_mk_string_symbol'] = createExportWrapper('Z3_mk_string_symbol', 2);
var _Z3_is_eq_sort = Module['_Z3_is_eq_sort'] = createExportWrapper('Z3_is_eq_sort', 3);
var _Z3_mk_uninterpreted_sort = Module['_Z3_mk_uninterpreted_sort'] = createExportWrapper('Z3_mk_uninterpreted_sort', 2);
var _Z3_mk_type_variable = Module['_Z3_mk_type_variable'] = createExportWrapper('Z3_mk_type_variable', 2);
var _Z3_is_eq_ast = Module['_Z3_is_eq_ast'] = createExportWrapper('Z3_is_eq_ast', 3);
var _Z3_is_eq_func_decl = Module['_Z3_is_eq_func_decl'] = createExportWrapper('Z3_is_eq_func_decl', 3);
var _Z3_mk_func_decl = Module['_Z3_mk_func_decl'] = createExportWrapper('Z3_mk_func_decl', 5);
var _Z3_mk_rec_func_decl = Module['_Z3_mk_rec_func_decl'] = createExportWrapper('Z3_mk_rec_func_decl', 5);
var _Z3_add_rec_def = Module['_Z3_add_rec_def'] = createExportWrapper('Z3_add_rec_def', 5);
var _Z3_mk_app = Module['_Z3_mk_app'] = createExportWrapper('Z3_mk_app', 4);
var _Z3_mk_const = Module['_Z3_mk_const'] = createExportWrapper('Z3_mk_const', 3);
var _Z3_mk_fresh_func_decl = Module['_Z3_mk_fresh_func_decl'] = createExportWrapper('Z3_mk_fresh_func_decl', 5);
var _Z3_mk_fresh_const = Module['_Z3_mk_fresh_const'] = createExportWrapper('Z3_mk_fresh_const', 3);
var _Z3_mk_true = Module['_Z3_mk_true'] = createExportWrapper('Z3_mk_true', 1);
var _Z3_mk_false = Module['_Z3_mk_false'] = createExportWrapper('Z3_mk_false', 1);
var _Z3_mk_not = Module['_Z3_mk_not'] = createExportWrapper('Z3_mk_not', 2);
var _Z3_mk_eq = Module['_Z3_mk_eq'] = createExportWrapper('Z3_mk_eq', 3);
var _Z3_mk_distinct = Module['_Z3_mk_distinct'] = createExportWrapper('Z3_mk_distinct', 3);
var _Z3_mk_iff = Module['_Z3_mk_iff'] = createExportWrapper('Z3_mk_iff', 3);
var _Z3_mk_implies = Module['_Z3_mk_implies'] = createExportWrapper('Z3_mk_implies', 3);
var _Z3_mk_xor = Module['_Z3_mk_xor'] = createExportWrapper('Z3_mk_xor', 3);
var _Z3_mk_and = Module['_Z3_mk_and'] = createExportWrapper('Z3_mk_and', 3);
var _Z3_mk_or = Module['_Z3_mk_or'] = createExportWrapper('Z3_mk_or', 3);
var _Z3_mk_ite = Module['_Z3_mk_ite'] = createExportWrapper('Z3_mk_ite', 4);
var _Z3_mk_bool_sort = Module['_Z3_mk_bool_sort'] = createExportWrapper('Z3_mk_bool_sort', 1);
var _Z3_app_to_ast = Module['_Z3_app_to_ast'] = createExportWrapper('Z3_app_to_ast', 2);
var _Z3_sort_to_ast = Module['_Z3_sort_to_ast'] = createExportWrapper('Z3_sort_to_ast', 2);
var _Z3_func_decl_to_ast = Module['_Z3_func_decl_to_ast'] = createExportWrapper('Z3_func_decl_to_ast', 2);
var _Z3_get_ast_id = Module['_Z3_get_ast_id'] = createExportWrapper('Z3_get_ast_id', 2);
var _Z3_get_func_decl_id = Module['_Z3_get_func_decl_id'] = createExportWrapper('Z3_get_func_decl_id', 2);
var _Z3_get_sort_id = Module['_Z3_get_sort_id'] = createExportWrapper('Z3_get_sort_id', 2);
var _Z3_is_well_sorted = Module['_Z3_is_well_sorted'] = createExportWrapper('Z3_is_well_sorted', 2);
var _Z3_get_symbol_kind = Module['_Z3_get_symbol_kind'] = createExportWrapper('Z3_get_symbol_kind', 2);
var _Z3_get_symbol_int = Module['_Z3_get_symbol_int'] = createExportWrapper('Z3_get_symbol_int', 2);
var _Z3_get_symbol_string = Module['_Z3_get_symbol_string'] = createExportWrapper('Z3_get_symbol_string', 2);
var _Z3_get_ast_kind = Module['_Z3_get_ast_kind'] = createExportWrapper('Z3_get_ast_kind', 2);
var _Z3_get_ast_hash = Module['_Z3_get_ast_hash'] = createExportWrapper('Z3_get_ast_hash', 2);
var _Z3_is_app = Module['_Z3_is_app'] = createExportWrapper('Z3_is_app', 2);
var _Z3_to_app = Module['_Z3_to_app'] = createExportWrapper('Z3_to_app', 2);
var _Z3_is_ground = Module['_Z3_is_ground'] = createExportWrapper('Z3_is_ground', 2);
var _Z3_get_depth = Module['_Z3_get_depth'] = createExportWrapper('Z3_get_depth', 2);
var _Z3_to_func_decl = Module['_Z3_to_func_decl'] = createExportWrapper('Z3_to_func_decl', 2);
var _Z3_get_app_decl = Module['_Z3_get_app_decl'] = createExportWrapper('Z3_get_app_decl', 2);
var _Z3_get_app_num_args = Module['_Z3_get_app_num_args'] = createExportWrapper('Z3_get_app_num_args', 2);
var _Z3_get_app_arg = Module['_Z3_get_app_arg'] = createExportWrapper('Z3_get_app_arg', 3);
var _Z3_get_decl_name = Module['_Z3_get_decl_name'] = createExportWrapper('Z3_get_decl_name', 2);
var _Z3_get_decl_num_parameters = Module['_Z3_get_decl_num_parameters'] = createExportWrapper('Z3_get_decl_num_parameters', 2);
var _Z3_get_decl_parameter_kind = Module['_Z3_get_decl_parameter_kind'] = createExportWrapper('Z3_get_decl_parameter_kind', 3);
var _Z3_get_decl_int_parameter = Module['_Z3_get_decl_int_parameter'] = createExportWrapper('Z3_get_decl_int_parameter', 3);
var _Z3_get_decl_double_parameter = Module['_Z3_get_decl_double_parameter'] = createExportWrapper('Z3_get_decl_double_parameter', 3);
var _Z3_get_decl_symbol_parameter = Module['_Z3_get_decl_symbol_parameter'] = createExportWrapper('Z3_get_decl_symbol_parameter', 3);
var _Z3_get_decl_sort_parameter = Module['_Z3_get_decl_sort_parameter'] = createExportWrapper('Z3_get_decl_sort_parameter', 3);
var _Z3_get_decl_ast_parameter = Module['_Z3_get_decl_ast_parameter'] = createExportWrapper('Z3_get_decl_ast_parameter', 3);
var _Z3_get_decl_func_decl_parameter = Module['_Z3_get_decl_func_decl_parameter'] = createExportWrapper('Z3_get_decl_func_decl_parameter', 3);
var _Z3_get_decl_rational_parameter = Module['_Z3_get_decl_rational_parameter'] = createExportWrapper('Z3_get_decl_rational_parameter', 3);
var _Z3_get_sort_name = Module['_Z3_get_sort_name'] = createExportWrapper('Z3_get_sort_name', 2);
var _Z3_get_sort = Module['_Z3_get_sort'] = createExportWrapper('Z3_get_sort', 2);
var _Z3_get_arity = Module['_Z3_get_arity'] = createExportWrapper('Z3_get_arity', 2);
var _Z3_get_domain_size = Module['_Z3_get_domain_size'] = createExportWrapper('Z3_get_domain_size', 2);
var _Z3_get_domain = Module['_Z3_get_domain'] = createExportWrapper('Z3_get_domain', 3);
var _Z3_get_range = Module['_Z3_get_range'] = createExportWrapper('Z3_get_range', 2);
var _Z3_get_bool_value = Module['_Z3_get_bool_value'] = createExportWrapper('Z3_get_bool_value', 2);
var _Z3_simplify_get_help = Module['_Z3_simplify_get_help'] = createExportWrapper('Z3_simplify_get_help', 1);
var _Z3_simplify_get_param_descrs = Module['_Z3_simplify_get_param_descrs'] = createExportWrapper('Z3_simplify_get_param_descrs', 1);
var _Z3_update_term = Module['_Z3_update_term'] = createExportWrapper('Z3_update_term', 4);
var _Z3_substitute = Module['_Z3_substitute'] = createExportWrapper('Z3_substitute', 5);
var _Z3_substitute_funs = Module['_Z3_substitute_funs'] = createExportWrapper('Z3_substitute_funs', 5);
var _Z3_substitute_vars = Module['_Z3_substitute_vars'] = createExportWrapper('Z3_substitute_vars', 4);
var _Z3_ast_to_string = Module['_Z3_ast_to_string'] = createExportWrapper('Z3_ast_to_string', 2);
var _Z3_sort_to_string = Module['_Z3_sort_to_string'] = createExportWrapper('Z3_sort_to_string', 2);
var _Z3_func_decl_to_string = Module['_Z3_func_decl_to_string'] = createExportWrapper('Z3_func_decl_to_string', 2);
var _Z3_benchmark_to_smtlib_string = Module['_Z3_benchmark_to_smtlib_string'] = createExportWrapper('Z3_benchmark_to_smtlib_string', 8);
var _Z3_get_decl_kind = Module['_Z3_get_decl_kind'] = createExportWrapper('Z3_get_decl_kind', 2);
var _Z3_get_index_value = Module['_Z3_get_index_value'] = createExportWrapper('Z3_get_index_value', 2);
var _Z3_translate = Module['_Z3_translate'] = createExportWrapper('Z3_translate', 3);
var _Z3_mk_tactic = Module['_Z3_mk_tactic'] = createExportWrapper('Z3_mk_tactic', 2);
var _Z3_tactic_inc_ref = Module['_Z3_tactic_inc_ref'] = createExportWrapper('Z3_tactic_inc_ref', 2);
var _Z3_tactic_dec_ref = Module['_Z3_tactic_dec_ref'] = createExportWrapper('Z3_tactic_dec_ref', 2);
var _Z3_mk_probe = Module['_Z3_mk_probe'] = createExportWrapper('Z3_mk_probe', 2);
var _Z3_probe_inc_ref = Module['_Z3_probe_inc_ref'] = createExportWrapper('Z3_probe_inc_ref', 2);
var _Z3_probe_dec_ref = Module['_Z3_probe_dec_ref'] = createExportWrapper('Z3_probe_dec_ref', 2);
var _Z3_tactic_and_then = Module['_Z3_tactic_and_then'] = createExportWrapper('Z3_tactic_and_then', 3);
var _Z3_tactic_or_else = Module['_Z3_tactic_or_else'] = createExportWrapper('Z3_tactic_or_else', 3);
var _Z3_tactic_par_or = Module['_Z3_tactic_par_or'] = createExportWrapper('Z3_tactic_par_or', 3);
var _Z3_tactic_par_and_then = Module['_Z3_tactic_par_and_then'] = createExportWrapper('Z3_tactic_par_and_then', 3);
var _Z3_tactic_try_for = Module['_Z3_tactic_try_for'] = createExportWrapper('Z3_tactic_try_for', 3);
var _Z3_tactic_when = Module['_Z3_tactic_when'] = createExportWrapper('Z3_tactic_when', 3);
var _Z3_tactic_cond = Module['_Z3_tactic_cond'] = createExportWrapper('Z3_tactic_cond', 4);
var _Z3_tactic_repeat = Module['_Z3_tactic_repeat'] = createExportWrapper('Z3_tactic_repeat', 3);
var _Z3_tactic_skip = Module['_Z3_tactic_skip'] = createExportWrapper('Z3_tactic_skip', 1);
var _Z3_tactic_fail = Module['_Z3_tactic_fail'] = createExportWrapper('Z3_tactic_fail', 1);
var _Z3_tactic_fail_if = Module['_Z3_tactic_fail_if'] = createExportWrapper('Z3_tactic_fail_if', 2);
var _Z3_tactic_fail_if_not_decided = Module['_Z3_tactic_fail_if_not_decided'] = createExportWrapper('Z3_tactic_fail_if_not_decided', 1);
var _Z3_tactic_using_params = Module['_Z3_tactic_using_params'] = createExportWrapper('Z3_tactic_using_params', 3);
var _Z3_probe_const = Module['_Z3_probe_const'] = createExportWrapper('Z3_probe_const', 2);
var _Z3_probe_lt = Module['_Z3_probe_lt'] = createExportWrapper('Z3_probe_lt', 3);
var _Z3_probe_gt = Module['_Z3_probe_gt'] = createExportWrapper('Z3_probe_gt', 3);
var _Z3_probe_le = Module['_Z3_probe_le'] = createExportWrapper('Z3_probe_le', 3);
var _Z3_probe_ge = Module['_Z3_probe_ge'] = createExportWrapper('Z3_probe_ge', 3);
var _Z3_probe_eq = Module['_Z3_probe_eq'] = createExportWrapper('Z3_probe_eq', 3);
var _Z3_probe_and = Module['_Z3_probe_and'] = createExportWrapper('Z3_probe_and', 3);
var _Z3_probe_or = Module['_Z3_probe_or'] = createExportWrapper('Z3_probe_or', 3);
var _Z3_probe_not = Module['_Z3_probe_not'] = createExportWrapper('Z3_probe_not', 2);
var _Z3_get_num_tactics = Module['_Z3_get_num_tactics'] = createExportWrapper('Z3_get_num_tactics', 1);
var _Z3_get_tactic_name = Module['_Z3_get_tactic_name'] = createExportWrapper('Z3_get_tactic_name', 2);
var _Z3_get_num_probes = Module['_Z3_get_num_probes'] = createExportWrapper('Z3_get_num_probes', 1);
var _Z3_get_probe_name = Module['_Z3_get_probe_name'] = createExportWrapper('Z3_get_probe_name', 2);
var _Z3_tactic_get_help = Module['_Z3_tactic_get_help'] = createExportWrapper('Z3_tactic_get_help', 2);
var _Z3_tactic_get_param_descrs = Module['_Z3_tactic_get_param_descrs'] = createExportWrapper('Z3_tactic_get_param_descrs', 2);
var _Z3_tactic_get_descr = Module['_Z3_tactic_get_descr'] = createExportWrapper('Z3_tactic_get_descr', 2);
var _Z3_probe_get_descr = Module['_Z3_probe_get_descr'] = createExportWrapper('Z3_probe_get_descr', 2);
var _Z3_probe_apply = Module['_Z3_probe_apply'] = createExportWrapper('Z3_probe_apply', 3);
var _Z3_apply_result_inc_ref = Module['_Z3_apply_result_inc_ref'] = createExportWrapper('Z3_apply_result_inc_ref', 2);
var _Z3_apply_result_dec_ref = Module['_Z3_apply_result_dec_ref'] = createExportWrapper('Z3_apply_result_dec_ref', 2);
var _Z3_apply_result_to_string = Module['_Z3_apply_result_to_string'] = createExportWrapper('Z3_apply_result_to_string', 2);
var _Z3_apply_result_get_num_subgoals = Module['_Z3_apply_result_get_num_subgoals'] = createExportWrapper('Z3_apply_result_get_num_subgoals', 2);
var _Z3_apply_result_get_subgoal = Module['_Z3_apply_result_get_subgoal'] = createExportWrapper('Z3_apply_result_get_subgoal', 3);
var _Z3_mk_simplifier = Module['_Z3_mk_simplifier'] = createExportWrapper('Z3_mk_simplifier', 2);
var _Z3_simplifier_inc_ref = Module['_Z3_simplifier_inc_ref'] = createExportWrapper('Z3_simplifier_inc_ref', 2);
var _Z3_simplifier_dec_ref = Module['_Z3_simplifier_dec_ref'] = createExportWrapper('Z3_simplifier_dec_ref', 2);
var _Z3_get_num_simplifiers = Module['_Z3_get_num_simplifiers'] = createExportWrapper('Z3_get_num_simplifiers', 1);
var _Z3_get_simplifier_name = Module['_Z3_get_simplifier_name'] = createExportWrapper('Z3_get_simplifier_name', 2);
var _Z3_simplifier_and_then = Module['_Z3_simplifier_and_then'] = createExportWrapper('Z3_simplifier_and_then', 3);
var _Z3_simplifier_using_params = Module['_Z3_simplifier_using_params'] = createExportWrapper('Z3_simplifier_using_params', 3);
var _Z3_simplifier_get_help = Module['_Z3_simplifier_get_help'] = createExportWrapper('Z3_simplifier_get_help', 2);
var _Z3_simplifier_get_param_descrs = Module['_Z3_simplifier_get_param_descrs'] = createExportWrapper('Z3_simplifier_get_param_descrs', 2);
var _Z3_simplifier_get_descr = Module['_Z3_simplifier_get_descr'] = createExportWrapper('Z3_simplifier_get_descr', 2);
var _Z3_rcf_del = Module['_Z3_rcf_del'] = createExportWrapper('Z3_rcf_del', 2);
var _Z3_rcf_mk_rational = Module['_Z3_rcf_mk_rational'] = createExportWrapper('Z3_rcf_mk_rational', 2);
var _Z3_rcf_mk_small_int = Module['_Z3_rcf_mk_small_int'] = createExportWrapper('Z3_rcf_mk_small_int', 2);
var _Z3_rcf_mk_pi = Module['_Z3_rcf_mk_pi'] = createExportWrapper('Z3_rcf_mk_pi', 1);
var _Z3_rcf_mk_e = Module['_Z3_rcf_mk_e'] = createExportWrapper('Z3_rcf_mk_e', 1);
var _Z3_rcf_mk_infinitesimal = Module['_Z3_rcf_mk_infinitesimal'] = createExportWrapper('Z3_rcf_mk_infinitesimal', 1);
var _Z3_rcf_mk_roots = Module['_Z3_rcf_mk_roots'] = createExportWrapper('Z3_rcf_mk_roots', 4);
var _Z3_rcf_add = Module['_Z3_rcf_add'] = createExportWrapper('Z3_rcf_add', 3);
var _Z3_rcf_sub = Module['_Z3_rcf_sub'] = createExportWrapper('Z3_rcf_sub', 3);
var _Z3_rcf_mul = Module['_Z3_rcf_mul'] = createExportWrapper('Z3_rcf_mul', 3);
var _Z3_rcf_div = Module['_Z3_rcf_div'] = createExportWrapper('Z3_rcf_div', 3);
var _Z3_rcf_neg = Module['_Z3_rcf_neg'] = createExportWrapper('Z3_rcf_neg', 2);
var _Z3_rcf_inv = Module['_Z3_rcf_inv'] = createExportWrapper('Z3_rcf_inv', 2);
var _Z3_rcf_power = Module['_Z3_rcf_power'] = createExportWrapper('Z3_rcf_power', 3);
var _Z3_rcf_lt = Module['_Z3_rcf_lt'] = createExportWrapper('Z3_rcf_lt', 3);
var _Z3_rcf_gt = Module['_Z3_rcf_gt'] = createExportWrapper('Z3_rcf_gt', 3);
var _Z3_rcf_le = Module['_Z3_rcf_le'] = createExportWrapper('Z3_rcf_le', 3);
var _Z3_rcf_ge = Module['_Z3_rcf_ge'] = createExportWrapper('Z3_rcf_ge', 3);
var _Z3_rcf_eq = Module['_Z3_rcf_eq'] = createExportWrapper('Z3_rcf_eq', 3);
var _Z3_rcf_neq = Module['_Z3_rcf_neq'] = createExportWrapper('Z3_rcf_neq', 3);
var _Z3_rcf_num_to_string = Module['_Z3_rcf_num_to_string'] = createExportWrapper('Z3_rcf_num_to_string', 4);
var _Z3_rcf_num_to_decimal_string = Module['_Z3_rcf_num_to_decimal_string'] = createExportWrapper('Z3_rcf_num_to_decimal_string', 3);
var _Z3_rcf_get_numerator_denominator = Module['_Z3_rcf_get_numerator_denominator'] = createExportWrapper('Z3_rcf_get_numerator_denominator', 4);
var _Z3_rcf_is_rational = Module['_Z3_rcf_is_rational'] = createExportWrapper('Z3_rcf_is_rational', 2);
var _Z3_rcf_is_algebraic = Module['_Z3_rcf_is_algebraic'] = createExportWrapper('Z3_rcf_is_algebraic', 2);
var _Z3_rcf_is_infinitesimal = Module['_Z3_rcf_is_infinitesimal'] = createExportWrapper('Z3_rcf_is_infinitesimal', 2);
var _Z3_rcf_is_transcendental = Module['_Z3_rcf_is_transcendental'] = createExportWrapper('Z3_rcf_is_transcendental', 2);
var _Z3_rcf_extension_index = Module['_Z3_rcf_extension_index'] = createExportWrapper('Z3_rcf_extension_index', 2);
var _Z3_rcf_transcendental_name = Module['_Z3_rcf_transcendental_name'] = createExportWrapper('Z3_rcf_transcendental_name', 2);
var _Z3_rcf_infinitesimal_name = Module['_Z3_rcf_infinitesimal_name'] = createExportWrapper('Z3_rcf_infinitesimal_name', 2);
var _Z3_rcf_num_coefficients = Module['_Z3_rcf_num_coefficients'] = createExportWrapper('Z3_rcf_num_coefficients', 2);
var _Z3_rcf_coefficient = Module['_Z3_rcf_coefficient'] = createExportWrapper('Z3_rcf_coefficient', 3);
var _Z3_rcf_interval = Module['_Z3_rcf_interval'] = createExportWrapper('Z3_rcf_interval', 8);
var _Z3_rcf_num_sign_conditions = Module['_Z3_rcf_num_sign_conditions'] = createExportWrapper('Z3_rcf_num_sign_conditions', 2);
var _Z3_rcf_sign_condition_sign = Module['_Z3_rcf_sign_condition_sign'] = createExportWrapper('Z3_rcf_sign_condition_sign', 3);
var _Z3_rcf_num_sign_condition_coefficients = Module['_Z3_rcf_num_sign_condition_coefficients'] = createExportWrapper('Z3_rcf_num_sign_condition_coefficients', 3);
var _Z3_rcf_sign_condition_coefficient = Module['_Z3_rcf_sign_condition_coefficient'] = createExportWrapper('Z3_rcf_sign_condition_coefficient', 4);
var _Z3_global_param_set = Module['_Z3_global_param_set'] = createExportWrapper('Z3_global_param_set', 2);
var _Z3_global_param_reset_all = Module['_Z3_global_param_reset_all'] = createExportWrapper('Z3_global_param_reset_all', 0);
var _Z3_global_param_get = Module['_Z3_global_param_get'] = createExportWrapper('Z3_global_param_get', 2);
var _Z3_get_global_param_descrs = Module['_Z3_get_global_param_descrs'] = createExportWrapper('Z3_get_global_param_descrs', 1);
var _Z3_mk_config = Module['_Z3_mk_config'] = createExportWrapper('Z3_mk_config', 0);
var _Z3_del_config = Module['_Z3_del_config'] = createExportWrapper('Z3_del_config', 1);
var _Z3_set_param_value = Module['_Z3_set_param_value'] = createExportWrapper('Z3_set_param_value', 3);
var _Z3_update_param_value = Module['_Z3_update_param_value'] = createExportWrapper('Z3_update_param_value', 3);
var _Z3_mk_quantifier = Module['_Z3_mk_quantifier'] = createExportWrapper('Z3_mk_quantifier', 9);
var _Z3_mk_quantifier_ex = Module['_Z3_mk_quantifier_ex'] = createExportWrapper('Z3_mk_quantifier_ex', 13);
var _Z3_mk_forall = Module['_Z3_mk_forall'] = createExportWrapper('Z3_mk_forall', 8);
var _Z3_mk_exists = Module['_Z3_mk_exists'] = createExportWrapper('Z3_mk_exists', 8);
var _Z3_mk_lambda = Module['_Z3_mk_lambda'] = createExportWrapper('Z3_mk_lambda', 5);
var _Z3_mk_lambda_const = Module['_Z3_mk_lambda_const'] = createExportWrapper('Z3_mk_lambda_const', 4);
var _Z3_mk_quantifier_const_ex = Module['_Z3_mk_quantifier_const_ex'] = createExportWrapper('Z3_mk_quantifier_const_ex', 12);
var _Z3_mk_quantifier_const = Module['_Z3_mk_quantifier_const'] = createExportWrapper('Z3_mk_quantifier_const', 8);
var _Z3_mk_forall_const = Module['_Z3_mk_forall_const'] = createExportWrapper('Z3_mk_forall_const', 7);
var _Z3_mk_exists_const = Module['_Z3_mk_exists_const'] = createExportWrapper('Z3_mk_exists_const', 7);
var _Z3_mk_pattern = Module['_Z3_mk_pattern'] = createExportWrapper('Z3_mk_pattern', 3);
var _Z3_mk_bound = Module['_Z3_mk_bound'] = createExportWrapper('Z3_mk_bound', 3);
var _Z3_is_quantifier_forall = Module['_Z3_is_quantifier_forall'] = createExportWrapper('Z3_is_quantifier_forall', 2);
var _Z3_is_quantifier_exists = Module['_Z3_is_quantifier_exists'] = createExportWrapper('Z3_is_quantifier_exists', 2);
var _Z3_is_lambda = Module['_Z3_is_lambda'] = createExportWrapper('Z3_is_lambda', 2);
var _Z3_get_quantifier_weight = Module['_Z3_get_quantifier_weight'] = createExportWrapper('Z3_get_quantifier_weight', 2);
var _Z3_get_quantifier_skolem_id = Module['_Z3_get_quantifier_skolem_id'] = createExportWrapper('Z3_get_quantifier_skolem_id', 2);
var _Z3_get_quantifier_id = Module['_Z3_get_quantifier_id'] = createExportWrapper('Z3_get_quantifier_id', 2);
var _Z3_get_quantifier_num_patterns = Module['_Z3_get_quantifier_num_patterns'] = createExportWrapper('Z3_get_quantifier_num_patterns', 2);
var _Z3_get_quantifier_pattern_ast = Module['_Z3_get_quantifier_pattern_ast'] = createExportWrapper('Z3_get_quantifier_pattern_ast', 3);
var _Z3_get_quantifier_num_no_patterns = Module['_Z3_get_quantifier_num_no_patterns'] = createExportWrapper('Z3_get_quantifier_num_no_patterns', 2);
var _Z3_get_quantifier_no_pattern_ast = Module['_Z3_get_quantifier_no_pattern_ast'] = createExportWrapper('Z3_get_quantifier_no_pattern_ast', 3);
var _Z3_get_quantifier_bound_name = Module['_Z3_get_quantifier_bound_name'] = createExportWrapper('Z3_get_quantifier_bound_name', 3);
var _Z3_get_quantifier_bound_sort = Module['_Z3_get_quantifier_bound_sort'] = createExportWrapper('Z3_get_quantifier_bound_sort', 3);
var _Z3_get_quantifier_body = Module['_Z3_get_quantifier_body'] = createExportWrapper('Z3_get_quantifier_body', 2);
var _Z3_get_quantifier_num_bound = Module['_Z3_get_quantifier_num_bound'] = createExportWrapper('Z3_get_quantifier_num_bound', 2);
var _Z3_get_pattern_num_terms = Module['_Z3_get_pattern_num_terms'] = createExportWrapper('Z3_get_pattern_num_terms', 2);
var _Z3_get_pattern = Module['_Z3_get_pattern'] = createExportWrapper('Z3_get_pattern', 3);
var _Z3_pattern_to_ast = Module['_Z3_pattern_to_ast'] = createExportWrapper('Z3_pattern_to_ast', 2);
var _Z3_pattern_to_string = Module['_Z3_pattern_to_string'] = createExportWrapper('Z3_pattern_to_string', 2);
var _Z3_algebraic_is_value = Module['_Z3_algebraic_is_value'] = createExportWrapper('Z3_algebraic_is_value', 2);
var _Z3_algebraic_is_pos = Module['_Z3_algebraic_is_pos'] = createExportWrapper('Z3_algebraic_is_pos', 2);
var _Z3_algebraic_sign = Module['_Z3_algebraic_sign'] = createExportWrapper('Z3_algebraic_sign', 2);
var _Z3_algebraic_is_neg = Module['_Z3_algebraic_is_neg'] = createExportWrapper('Z3_algebraic_is_neg', 2);
var _Z3_algebraic_is_zero = Module['_Z3_algebraic_is_zero'] = createExportWrapper('Z3_algebraic_is_zero', 2);
var _Z3_algebraic_add = Module['_Z3_algebraic_add'] = createExportWrapper('Z3_algebraic_add', 3);
var _Z3_algebraic_sub = Module['_Z3_algebraic_sub'] = createExportWrapper('Z3_algebraic_sub', 3);
var _Z3_algebraic_mul = Module['_Z3_algebraic_mul'] = createExportWrapper('Z3_algebraic_mul', 3);
var _Z3_algebraic_div = Module['_Z3_algebraic_div'] = createExportWrapper('Z3_algebraic_div', 3);
var _Z3_algebraic_root = Module['_Z3_algebraic_root'] = createExportWrapper('Z3_algebraic_root', 3);
var _Z3_algebraic_power = Module['_Z3_algebraic_power'] = createExportWrapper('Z3_algebraic_power', 3);
var _Z3_algebraic_lt = Module['_Z3_algebraic_lt'] = createExportWrapper('Z3_algebraic_lt', 3);
var _Z3_algebraic_gt = Module['_Z3_algebraic_gt'] = createExportWrapper('Z3_algebraic_gt', 3);
var _Z3_algebraic_le = Module['_Z3_algebraic_le'] = createExportWrapper('Z3_algebraic_le', 3);
var _Z3_algebraic_ge = Module['_Z3_algebraic_ge'] = createExportWrapper('Z3_algebraic_ge', 3);
var _Z3_algebraic_eq = Module['_Z3_algebraic_eq'] = createExportWrapper('Z3_algebraic_eq', 3);
var _Z3_algebraic_neq = Module['_Z3_algebraic_neq'] = createExportWrapper('Z3_algebraic_neq', 3);
var _Z3_algebraic_get_poly = Module['_Z3_algebraic_get_poly'] = createExportWrapper('Z3_algebraic_get_poly', 2);
var _Z3_algebraic_get_i = Module['_Z3_algebraic_get_i'] = createExportWrapper('Z3_algebraic_get_i', 2);
var _Z3_mk_goal = Module['_Z3_mk_goal'] = createExportWrapper('Z3_mk_goal', 4);
var _Z3_goal_inc_ref = Module['_Z3_goal_inc_ref'] = createExportWrapper('Z3_goal_inc_ref', 2);
var _Z3_goal_dec_ref = Module['_Z3_goal_dec_ref'] = createExportWrapper('Z3_goal_dec_ref', 2);
var _Z3_goal_precision = Module['_Z3_goal_precision'] = createExportWrapper('Z3_goal_precision', 2);
var _Z3_goal_assert = Module['_Z3_goal_assert'] = createExportWrapper('Z3_goal_assert', 3);
var _Z3_goal_inconsistent = Module['_Z3_goal_inconsistent'] = createExportWrapper('Z3_goal_inconsistent', 2);
var _Z3_goal_depth = Module['_Z3_goal_depth'] = createExportWrapper('Z3_goal_depth', 2);
var _Z3_goal_reset = Module['_Z3_goal_reset'] = createExportWrapper('Z3_goal_reset', 2);
var _Z3_goal_size = Module['_Z3_goal_size'] = createExportWrapper('Z3_goal_size', 2);
var _Z3_goal_formula = Module['_Z3_goal_formula'] = createExportWrapper('Z3_goal_formula', 3);
var _Z3_goal_num_exprs = Module['_Z3_goal_num_exprs'] = createExportWrapper('Z3_goal_num_exprs', 2);
var _Z3_goal_is_decided_sat = Module['_Z3_goal_is_decided_sat'] = createExportWrapper('Z3_goal_is_decided_sat', 2);
var _Z3_goal_is_decided_unsat = Module['_Z3_goal_is_decided_unsat'] = createExportWrapper('Z3_goal_is_decided_unsat', 2);
var _Z3_goal_convert_model = Module['_Z3_goal_convert_model'] = createExportWrapper('Z3_goal_convert_model', 3);
var _Z3_goal_translate = Module['_Z3_goal_translate'] = createExportWrapper('Z3_goal_translate', 3);
var _Z3_goal_to_string = Module['_Z3_goal_to_string'] = createExportWrapper('Z3_goal_to_string', 2);
var _Z3_goal_to_dimacs_string = Module['_Z3_goal_to_dimacs_string'] = createExportWrapper('Z3_goal_to_dimacs_string', 3);
var _Z3_mk_numeral = Module['_Z3_mk_numeral'] = createExportWrapper('Z3_mk_numeral', 3);
var _Z3_mk_int = Module['_Z3_mk_int'] = createExportWrapper('Z3_mk_int', 3);
var _Z3_mk_unsigned_int = Module['_Z3_mk_unsigned_int'] = createExportWrapper('Z3_mk_unsigned_int', 3);
var _Z3_mk_int64 = Module['_Z3_mk_int64'] = createExportWrapper('Z3_mk_int64', 3);
var _Z3_mk_unsigned_int64 = Module['_Z3_mk_unsigned_int64'] = createExportWrapper('Z3_mk_unsigned_int64', 3);
var _Z3_is_numeral_ast = Module['_Z3_is_numeral_ast'] = createExportWrapper('Z3_is_numeral_ast', 2);
var _Z3_get_numeral_binary_string = Module['_Z3_get_numeral_binary_string'] = createExportWrapper('Z3_get_numeral_binary_string', 2);
var _Z3_get_numeral_string = Module['_Z3_get_numeral_string'] = createExportWrapper('Z3_get_numeral_string', 2);
var _Z3_get_numeral_double = Module['_Z3_get_numeral_double'] = createExportWrapper('Z3_get_numeral_double', 2);
var _Z3_get_numeral_decimal_string = Module['_Z3_get_numeral_decimal_string'] = createExportWrapper('Z3_get_numeral_decimal_string', 3);
var _Z3_get_numeral_small = Module['_Z3_get_numeral_small'] = createExportWrapper('Z3_get_numeral_small', 4);
var _Z3_get_numeral_int = Module['_Z3_get_numeral_int'] = createExportWrapper('Z3_get_numeral_int', 3);
var _Z3_get_numeral_int64 = Module['_Z3_get_numeral_int64'] = createExportWrapper('Z3_get_numeral_int64', 3);
var _Z3_get_numeral_uint = Module['_Z3_get_numeral_uint'] = createExportWrapper('Z3_get_numeral_uint', 3);
var _Z3_get_numeral_uint64 = Module['_Z3_get_numeral_uint64'] = createExportWrapper('Z3_get_numeral_uint64', 3);
var _Z3_get_numeral_rational_int64 = Module['_Z3_get_numeral_rational_int64'] = createExportWrapper('Z3_get_numeral_rational_int64', 4);
var _Z3_mk_bv_numeral = Module['_Z3_mk_bv_numeral'] = createExportWrapper('Z3_mk_bv_numeral', 3);
var _Z3_mk_int_sort = Module['_Z3_mk_int_sort'] = createExportWrapper('Z3_mk_int_sort', 1);
var _Z3_mk_real_sort = Module['_Z3_mk_real_sort'] = createExportWrapper('Z3_mk_real_sort', 1);
var _Z3_mk_real_int64 = Module['_Z3_mk_real_int64'] = createExportWrapper('Z3_mk_real_int64', 3);
var _Z3_mk_real = Module['_Z3_mk_real'] = createExportWrapper('Z3_mk_real', 3);
var _Z3_mk_add = Module['_Z3_mk_add'] = createExportWrapper('Z3_mk_add', 3);
var _Z3_mk_mul = Module['_Z3_mk_mul'] = createExportWrapper('Z3_mk_mul', 3);
var _Z3_mk_power = Module['_Z3_mk_power'] = createExportWrapper('Z3_mk_power', 3);
var _Z3_mk_mod = Module['_Z3_mk_mod'] = createExportWrapper('Z3_mk_mod', 3);
var _Z3_mk_rem = Module['_Z3_mk_rem'] = createExportWrapper('Z3_mk_rem', 3);
var _Z3_mk_div = Module['_Z3_mk_div'] = createExportWrapper('Z3_mk_div', 3);
var _Z3_mk_lt = Module['_Z3_mk_lt'] = createExportWrapper('Z3_mk_lt', 3);
var _Z3_mk_gt = Module['_Z3_mk_gt'] = createExportWrapper('Z3_mk_gt', 3);
var _Z3_mk_le = Module['_Z3_mk_le'] = createExportWrapper('Z3_mk_le', 3);
var _Z3_mk_ge = Module['_Z3_mk_ge'] = createExportWrapper('Z3_mk_ge', 3);
var _Z3_mk_divides = Module['_Z3_mk_divides'] = createExportWrapper('Z3_mk_divides', 3);
var _Z3_mk_abs = Module['_Z3_mk_abs'] = createExportWrapper('Z3_mk_abs', 2);
var _Z3_mk_int2real = Module['_Z3_mk_int2real'] = createExportWrapper('Z3_mk_int2real', 2);
var _Z3_mk_real2int = Module['_Z3_mk_real2int'] = createExportWrapper('Z3_mk_real2int', 2);
var _Z3_mk_is_int = Module['_Z3_mk_is_int'] = createExportWrapper('Z3_mk_is_int', 2);
var _Z3_mk_sub = Module['_Z3_mk_sub'] = createExportWrapper('Z3_mk_sub', 3);
var _Z3_mk_unary_minus = Module['_Z3_mk_unary_minus'] = createExportWrapper('Z3_mk_unary_minus', 2);
var _Z3_is_algebraic_number = Module['_Z3_is_algebraic_number'] = createExportWrapper('Z3_is_algebraic_number', 2);
var _Z3_get_algebraic_number_lower = Module['_Z3_get_algebraic_number_lower'] = createExportWrapper('Z3_get_algebraic_number_lower', 3);
var _Z3_get_algebraic_number_upper = Module['_Z3_get_algebraic_number_upper'] = createExportWrapper('Z3_get_algebraic_number_upper', 3);
var _Z3_get_numerator = Module['_Z3_get_numerator'] = createExportWrapper('Z3_get_numerator', 2);
var _Z3_get_denominator = Module['_Z3_get_denominator'] = createExportWrapper('Z3_get_denominator', 2);
var _Z3_mk_simple_solver = Module['_Z3_mk_simple_solver'] = createExportWrapper('Z3_mk_simple_solver', 1);
var _Z3_mk_solver = Module['_Z3_mk_solver'] = createExportWrapper('Z3_mk_solver', 1);
var _Z3_mk_solver_for_logic = Module['_Z3_mk_solver_for_logic'] = createExportWrapper('Z3_mk_solver_for_logic', 2);
var _Z3_mk_solver_from_tactic = Module['_Z3_mk_solver_from_tactic'] = createExportWrapper('Z3_mk_solver_from_tactic', 2);
var _Z3_solver_add_simplifier = Module['_Z3_solver_add_simplifier'] = createExportWrapper('Z3_solver_add_simplifier', 3);
var _Z3_solver_translate = Module['_Z3_solver_translate'] = createExportWrapper('Z3_solver_translate', 3);
var _Z3_solver_import_model_converter = Module['_Z3_solver_import_model_converter'] = createExportWrapper('Z3_solver_import_model_converter', 3);
var _Z3_solver_from_string = Module['_Z3_solver_from_string'] = createExportWrapper('Z3_solver_from_string', 3);
var _Z3_solver_from_file = Module['_Z3_solver_from_file'] = createExportWrapper('Z3_solver_from_file', 3);
var _Z3_solver_get_help = Module['_Z3_solver_get_help'] = createExportWrapper('Z3_solver_get_help', 2);
var _Z3_solver_get_param_descrs = Module['_Z3_solver_get_param_descrs'] = createExportWrapper('Z3_solver_get_param_descrs', 2);
var _Z3_solver_set_params = Module['_Z3_solver_set_params'] = createExportWrapper('Z3_solver_set_params', 3);
var _Z3_solver_inc_ref = Module['_Z3_solver_inc_ref'] = createExportWrapper('Z3_solver_inc_ref', 2);
var _Z3_solver_dec_ref = Module['_Z3_solver_dec_ref'] = createExportWrapper('Z3_solver_dec_ref', 2);
var _Z3_solver_push = Module['_Z3_solver_push'] = createExportWrapper('Z3_solver_push', 2);
var _Z3_solver_interrupt = Module['_Z3_solver_interrupt'] = createExportWrapper('Z3_solver_interrupt', 2);
var _Z3_solver_pop = Module['_Z3_solver_pop'] = createExportWrapper('Z3_solver_pop', 3);
var _Z3_solver_reset = Module['_Z3_solver_reset'] = createExportWrapper('Z3_solver_reset', 2);
var _Z3_solver_get_num_scopes = Module['_Z3_solver_get_num_scopes'] = createExportWrapper('Z3_solver_get_num_scopes', 2);
var _Z3_solver_assert = Module['_Z3_solver_assert'] = createExportWrapper('Z3_solver_assert', 3);
var _Z3_solver_assert_and_track = Module['_Z3_solver_assert_and_track'] = createExportWrapper('Z3_solver_assert_and_track', 4);
var _Z3_solver_get_assertions = Module['_Z3_solver_get_assertions'] = createExportWrapper('Z3_solver_get_assertions', 2);
var _Z3_solver_get_units = Module['_Z3_solver_get_units'] = createExportWrapper('Z3_solver_get_units', 2);
var _Z3_solver_get_non_units = Module['_Z3_solver_get_non_units'] = createExportWrapper('Z3_solver_get_non_units', 2);
var _Z3_solver_get_levels = Module['_Z3_solver_get_levels'] = createExportWrapper('Z3_solver_get_levels', 5);
var _Z3_solver_get_trail = Module['_Z3_solver_get_trail'] = createExportWrapper('Z3_solver_get_trail', 2);
var _pthread_self = () => (_pthread_self = wasmExports['pthread_self'])();
var _Z3_ast_vector_size = Module['_Z3_ast_vector_size'] = createExportWrapper('Z3_ast_vector_size', 2);
var _Z3_ast_vector_get = Module['_Z3_ast_vector_get'] = createExportWrapper('Z3_ast_vector_get', 3);
var _Z3_solver_get_model = Module['_Z3_solver_get_model'] = createExportWrapper('Z3_solver_get_model', 2);
var _Z3_solver_get_proof = Module['_Z3_solver_get_proof'] = createExportWrapper('Z3_solver_get_proof', 2);
var _Z3_solver_get_unsat_core = Module['_Z3_solver_get_unsat_core'] = createExportWrapper('Z3_solver_get_unsat_core', 2);
var _Z3_solver_get_reason_unknown = Module['_Z3_solver_get_reason_unknown'] = createExportWrapper('Z3_solver_get_reason_unknown', 2);
var _Z3_solver_get_statistics = Module['_Z3_solver_get_statistics'] = createExportWrapper('Z3_solver_get_statistics', 2);
var _Z3_solver_to_string = Module['_Z3_solver_to_string'] = createExportWrapper('Z3_solver_to_string', 2);
var _Z3_solver_to_dimacs_string = Module['_Z3_solver_to_dimacs_string'] = createExportWrapper('Z3_solver_to_dimacs_string', 3);
var _Z3_get_implied_equalities = Module['_Z3_get_implied_equalities'] = createExportWrapper('Z3_get_implied_equalities', 5);
var _Z3_solver_congruence_root = Module['_Z3_solver_congruence_root'] = createExportWrapper('Z3_solver_congruence_root', 3);
var _Z3_solver_congruence_next = Module['_Z3_solver_congruence_next'] = createExportWrapper('Z3_solver_congruence_next', 3);
var _Z3_solver_congruence_explain = Module['_Z3_solver_congruence_explain'] = createExportWrapper('Z3_solver_congruence_explain', 4);
var _Z3_solver_solve_for = Module['_Z3_solver_solve_for'] = createExportWrapper('Z3_solver_solve_for', 5);
var _Z3_solver_register_on_clause = Module['_Z3_solver_register_on_clause'] = createExportWrapper('Z3_solver_register_on_clause', 4);
var _Z3_solver_propagate_init = Module['_Z3_solver_propagate_init'] = createExportWrapper('Z3_solver_propagate_init', 6);
var _Z3_solver_propagate_fixed = Module['_Z3_solver_propagate_fixed'] = createExportWrapper('Z3_solver_propagate_fixed', 3);
var _Z3_solver_propagate_final = Module['_Z3_solver_propagate_final'] = createExportWrapper('Z3_solver_propagate_final', 3);
var _Z3_solver_propagate_eq = Module['_Z3_solver_propagate_eq'] = createExportWrapper('Z3_solver_propagate_eq', 3);
var _Z3_solver_propagate_diseq = Module['_Z3_solver_propagate_diseq'] = createExportWrapper('Z3_solver_propagate_diseq', 3);
var _Z3_solver_propagate_register = Module['_Z3_solver_propagate_register'] = createExportWrapper('Z3_solver_propagate_register', 3);
var _Z3_solver_propagate_register_cb = Module['_Z3_solver_propagate_register_cb'] = createExportWrapper('Z3_solver_propagate_register_cb', 3);
var _Z3_solver_propagate_consequence = Module['_Z3_solver_propagate_consequence'] = createExportWrapper('Z3_solver_propagate_consequence', 8);
var _Z3_solver_propagate_created = Module['_Z3_solver_propagate_created'] = createExportWrapper('Z3_solver_propagate_created', 3);
var _Z3_solver_propagate_decide = Module['_Z3_solver_propagate_decide'] = createExportWrapper('Z3_solver_propagate_decide', 3);
var _Z3_solver_next_split = Module['_Z3_solver_next_split'] = createExportWrapper('Z3_solver_next_split', 5);
var _Z3_solver_propagate_declare = Module['_Z3_solver_propagate_declare'] = createExportWrapper('Z3_solver_propagate_declare', 5);
var _Z3_solver_set_initial_value = Module['_Z3_solver_set_initial_value'] = createExportWrapper('Z3_solver_set_initial_value', 4);
var _Z3_mk_fpa_rounding_mode_sort = Module['_Z3_mk_fpa_rounding_mode_sort'] = createExportWrapper('Z3_mk_fpa_rounding_mode_sort', 1);
var _Z3_mk_fpa_round_nearest_ties_to_even = Module['_Z3_mk_fpa_round_nearest_ties_to_even'] = createExportWrapper('Z3_mk_fpa_round_nearest_ties_to_even', 1);
var _Z3_mk_fpa_rne = Module['_Z3_mk_fpa_rne'] = createExportWrapper('Z3_mk_fpa_rne', 1);
var _Z3_mk_fpa_round_nearest_ties_to_away = Module['_Z3_mk_fpa_round_nearest_ties_to_away'] = createExportWrapper('Z3_mk_fpa_round_nearest_ties_to_away', 1);
var _Z3_mk_fpa_rna = Module['_Z3_mk_fpa_rna'] = createExportWrapper('Z3_mk_fpa_rna', 1);
var _Z3_mk_fpa_round_toward_positive = Module['_Z3_mk_fpa_round_toward_positive'] = createExportWrapper('Z3_mk_fpa_round_toward_positive', 1);
var _Z3_mk_fpa_rtp = Module['_Z3_mk_fpa_rtp'] = createExportWrapper('Z3_mk_fpa_rtp', 1);
var _Z3_mk_fpa_round_toward_negative = Module['_Z3_mk_fpa_round_toward_negative'] = createExportWrapper('Z3_mk_fpa_round_toward_negative', 1);
var _Z3_mk_fpa_rtn = Module['_Z3_mk_fpa_rtn'] = createExportWrapper('Z3_mk_fpa_rtn', 1);
var _Z3_mk_fpa_round_toward_zero = Module['_Z3_mk_fpa_round_toward_zero'] = createExportWrapper('Z3_mk_fpa_round_toward_zero', 1);
var _Z3_mk_fpa_rtz = Module['_Z3_mk_fpa_rtz'] = createExportWrapper('Z3_mk_fpa_rtz', 1);
var _Z3_mk_fpa_sort = Module['_Z3_mk_fpa_sort'] = createExportWrapper('Z3_mk_fpa_sort', 3);
var _Z3_mk_fpa_sort_half = Module['_Z3_mk_fpa_sort_half'] = createExportWrapper('Z3_mk_fpa_sort_half', 1);
var _Z3_mk_fpa_sort_16 = Module['_Z3_mk_fpa_sort_16'] = createExportWrapper('Z3_mk_fpa_sort_16', 1);
var _Z3_mk_fpa_sort_single = Module['_Z3_mk_fpa_sort_single'] = createExportWrapper('Z3_mk_fpa_sort_single', 1);
var _Z3_mk_fpa_sort_32 = Module['_Z3_mk_fpa_sort_32'] = createExportWrapper('Z3_mk_fpa_sort_32', 1);
var _Z3_mk_fpa_sort_double = Module['_Z3_mk_fpa_sort_double'] = createExportWrapper('Z3_mk_fpa_sort_double', 1);
var _Z3_mk_fpa_sort_64 = Module['_Z3_mk_fpa_sort_64'] = createExportWrapper('Z3_mk_fpa_sort_64', 1);
var _Z3_mk_fpa_sort_quadruple = Module['_Z3_mk_fpa_sort_quadruple'] = createExportWrapper('Z3_mk_fpa_sort_quadruple', 1);
var _Z3_mk_fpa_sort_128 = Module['_Z3_mk_fpa_sort_128'] = createExportWrapper('Z3_mk_fpa_sort_128', 1);
var _Z3_mk_fpa_nan = Module['_Z3_mk_fpa_nan'] = createExportWrapper('Z3_mk_fpa_nan', 2);
var _Z3_mk_fpa_inf = Module['_Z3_mk_fpa_inf'] = createExportWrapper('Z3_mk_fpa_inf', 3);
var _Z3_mk_fpa_zero = Module['_Z3_mk_fpa_zero'] = createExportWrapper('Z3_mk_fpa_zero', 3);
var _Z3_mk_fpa_fp = Module['_Z3_mk_fpa_fp'] = createExportWrapper('Z3_mk_fpa_fp', 4);
var _Z3_mk_fpa_numeral_float = Module['_Z3_mk_fpa_numeral_float'] = createExportWrapper('Z3_mk_fpa_numeral_float', 3);
var _Z3_mk_fpa_numeral_double = Module['_Z3_mk_fpa_numeral_double'] = createExportWrapper('Z3_mk_fpa_numeral_double', 3);
var _Z3_mk_fpa_numeral_int = Module['_Z3_mk_fpa_numeral_int'] = createExportWrapper('Z3_mk_fpa_numeral_int', 3);
var _Z3_mk_fpa_numeral_int_uint = Module['_Z3_mk_fpa_numeral_int_uint'] = createExportWrapper('Z3_mk_fpa_numeral_int_uint', 5);
var _Z3_mk_fpa_numeral_int64_uint64 = Module['_Z3_mk_fpa_numeral_int64_uint64'] = createExportWrapper('Z3_mk_fpa_numeral_int64_uint64', 5);
var _Z3_mk_fpa_abs = Module['_Z3_mk_fpa_abs'] = createExportWrapper('Z3_mk_fpa_abs', 2);
var _Z3_mk_fpa_neg = Module['_Z3_mk_fpa_neg'] = createExportWrapper('Z3_mk_fpa_neg', 2);
var _Z3_mk_fpa_add = Module['_Z3_mk_fpa_add'] = createExportWrapper('Z3_mk_fpa_add', 4);
var _Z3_mk_fpa_sub = Module['_Z3_mk_fpa_sub'] = createExportWrapper('Z3_mk_fpa_sub', 4);
var _Z3_mk_fpa_mul = Module['_Z3_mk_fpa_mul'] = createExportWrapper('Z3_mk_fpa_mul', 4);
var _Z3_mk_fpa_div = Module['_Z3_mk_fpa_div'] = createExportWrapper('Z3_mk_fpa_div', 4);
var _Z3_mk_fpa_fma = Module['_Z3_mk_fpa_fma'] = createExportWrapper('Z3_mk_fpa_fma', 5);
var _Z3_mk_fpa_sqrt = Module['_Z3_mk_fpa_sqrt'] = createExportWrapper('Z3_mk_fpa_sqrt', 3);
var _Z3_mk_fpa_rem = Module['_Z3_mk_fpa_rem'] = createExportWrapper('Z3_mk_fpa_rem', 3);
var _Z3_mk_fpa_round_to_integral = Module['_Z3_mk_fpa_round_to_integral'] = createExportWrapper('Z3_mk_fpa_round_to_integral', 3);
var _Z3_mk_fpa_min = Module['_Z3_mk_fpa_min'] = createExportWrapper('Z3_mk_fpa_min', 3);
var _Z3_mk_fpa_max = Module['_Z3_mk_fpa_max'] = createExportWrapper('Z3_mk_fpa_max', 3);
var _Z3_mk_fpa_leq = Module['_Z3_mk_fpa_leq'] = createExportWrapper('Z3_mk_fpa_leq', 3);
var _Z3_mk_fpa_lt = Module['_Z3_mk_fpa_lt'] = createExportWrapper('Z3_mk_fpa_lt', 3);
var _Z3_mk_fpa_geq = Module['_Z3_mk_fpa_geq'] = createExportWrapper('Z3_mk_fpa_geq', 3);
var _Z3_mk_fpa_gt = Module['_Z3_mk_fpa_gt'] = createExportWrapper('Z3_mk_fpa_gt', 3);
var _Z3_mk_fpa_eq = Module['_Z3_mk_fpa_eq'] = createExportWrapper('Z3_mk_fpa_eq', 3);
var _Z3_mk_fpa_is_normal = Module['_Z3_mk_fpa_is_normal'] = createExportWrapper('Z3_mk_fpa_is_normal', 2);
var _Z3_mk_fpa_is_subnormal = Module['_Z3_mk_fpa_is_subnormal'] = createExportWrapper('Z3_mk_fpa_is_subnormal', 2);
var _Z3_mk_fpa_is_zero = Module['_Z3_mk_fpa_is_zero'] = createExportWrapper('Z3_mk_fpa_is_zero', 2);
var _Z3_mk_fpa_is_infinite = Module['_Z3_mk_fpa_is_infinite'] = createExportWrapper('Z3_mk_fpa_is_infinite', 2);
var _Z3_mk_fpa_is_nan = Module['_Z3_mk_fpa_is_nan'] = createExportWrapper('Z3_mk_fpa_is_nan', 2);
var _Z3_mk_fpa_is_negative = Module['_Z3_mk_fpa_is_negative'] = createExportWrapper('Z3_mk_fpa_is_negative', 2);
var _Z3_mk_fpa_is_positive = Module['_Z3_mk_fpa_is_positive'] = createExportWrapper('Z3_mk_fpa_is_positive', 2);
var _Z3_mk_fpa_to_fp_bv = Module['_Z3_mk_fpa_to_fp_bv'] = createExportWrapper('Z3_mk_fpa_to_fp_bv', 3);
var _Z3_mk_fpa_to_fp_float = Module['_Z3_mk_fpa_to_fp_float'] = createExportWrapper('Z3_mk_fpa_to_fp_float', 4);
var _Z3_mk_fpa_to_fp_real = Module['_Z3_mk_fpa_to_fp_real'] = createExportWrapper('Z3_mk_fpa_to_fp_real', 4);
var _Z3_mk_fpa_to_fp_signed = Module['_Z3_mk_fpa_to_fp_signed'] = createExportWrapper('Z3_mk_fpa_to_fp_signed', 4);
var _Z3_mk_fpa_to_fp_unsigned = Module['_Z3_mk_fpa_to_fp_unsigned'] = createExportWrapper('Z3_mk_fpa_to_fp_unsigned', 4);
var _Z3_mk_fpa_to_ubv = Module['_Z3_mk_fpa_to_ubv'] = createExportWrapper('Z3_mk_fpa_to_ubv', 4);
var _Z3_mk_fpa_to_sbv = Module['_Z3_mk_fpa_to_sbv'] = createExportWrapper('Z3_mk_fpa_to_sbv', 4);
var _Z3_mk_fpa_to_real = Module['_Z3_mk_fpa_to_real'] = createExportWrapper('Z3_mk_fpa_to_real', 2);
var _Z3_fpa_get_ebits = Module['_Z3_fpa_get_ebits'] = createExportWrapper('Z3_fpa_get_ebits', 2);
var _Z3_fpa_get_sbits = Module['_Z3_fpa_get_sbits'] = createExportWrapper('Z3_fpa_get_sbits', 2);
var _Z3_fpa_get_numeral_sign = Module['_Z3_fpa_get_numeral_sign'] = createExportWrapper('Z3_fpa_get_numeral_sign', 3);
var _Z3_fpa_get_numeral_sign_bv = Module['_Z3_fpa_get_numeral_sign_bv'] = createExportWrapper('Z3_fpa_get_numeral_sign_bv', 2);
var _Z3_fpa_get_numeral_significand_bv = Module['_Z3_fpa_get_numeral_significand_bv'] = createExportWrapper('Z3_fpa_get_numeral_significand_bv', 2);
var _Z3_fpa_get_numeral_significand_string = Module['_Z3_fpa_get_numeral_significand_string'] = createExportWrapper('Z3_fpa_get_numeral_significand_string', 2);
var _Z3_fpa_get_numeral_significand_uint64 = Module['_Z3_fpa_get_numeral_significand_uint64'] = createExportWrapper('Z3_fpa_get_numeral_significand_uint64', 3);
var _Z3_fpa_get_numeral_exponent_string = Module['_Z3_fpa_get_numeral_exponent_string'] = createExportWrapper('Z3_fpa_get_numeral_exponent_string', 3);
var _Z3_fpa_get_numeral_exponent_int64 = Module['_Z3_fpa_get_numeral_exponent_int64'] = createExportWrapper('Z3_fpa_get_numeral_exponent_int64', 4);
var _Z3_fpa_get_numeral_exponent_bv = Module['_Z3_fpa_get_numeral_exponent_bv'] = createExportWrapper('Z3_fpa_get_numeral_exponent_bv', 3);
var _Z3_mk_fpa_to_ieee_bv = Module['_Z3_mk_fpa_to_ieee_bv'] = createExportWrapper('Z3_mk_fpa_to_ieee_bv', 2);
var _Z3_mk_fpa_to_fp_int_real = Module['_Z3_mk_fpa_to_fp_int_real'] = createExportWrapper('Z3_mk_fpa_to_fp_int_real', 5);
var _Z3_fpa_is_numeral_nan = Module['_Z3_fpa_is_numeral_nan'] = createExportWrapper('Z3_fpa_is_numeral_nan', 2);
var _Z3_fpa_is_numeral_inf = Module['_Z3_fpa_is_numeral_inf'] = createExportWrapper('Z3_fpa_is_numeral_inf', 2);
var _Z3_fpa_is_numeral_zero = Module['_Z3_fpa_is_numeral_zero'] = createExportWrapper('Z3_fpa_is_numeral_zero', 2);
var _Z3_fpa_is_numeral_normal = Module['_Z3_fpa_is_numeral_normal'] = createExportWrapper('Z3_fpa_is_numeral_normal', 2);
var _Z3_fpa_is_numeral_subnormal = Module['_Z3_fpa_is_numeral_subnormal'] = createExportWrapper('Z3_fpa_is_numeral_subnormal', 2);
var _Z3_fpa_is_numeral_positive = Module['_Z3_fpa_is_numeral_positive'] = createExportWrapper('Z3_fpa_is_numeral_positive', 2);
var _Z3_fpa_is_numeral_negative = Module['_Z3_fpa_is_numeral_negative'] = createExportWrapper('Z3_fpa_is_numeral_negative', 2);
var _Z3_mk_ast_vector = Module['_Z3_mk_ast_vector'] = createExportWrapper('Z3_mk_ast_vector', 1);
var _Z3_ast_vector_inc_ref = Module['_Z3_ast_vector_inc_ref'] = createExportWrapper('Z3_ast_vector_inc_ref', 2);
var _Z3_ast_vector_dec_ref = Module['_Z3_ast_vector_dec_ref'] = createExportWrapper('Z3_ast_vector_dec_ref', 2);
var _Z3_ast_vector_set = Module['_Z3_ast_vector_set'] = createExportWrapper('Z3_ast_vector_set', 4);
var _Z3_ast_vector_resize = Module['_Z3_ast_vector_resize'] = createExportWrapper('Z3_ast_vector_resize', 3);
var _Z3_ast_vector_push = Module['_Z3_ast_vector_push'] = createExportWrapper('Z3_ast_vector_push', 3);
var _Z3_ast_vector_translate = Module['_Z3_ast_vector_translate'] = createExportWrapper('Z3_ast_vector_translate', 3);
var _Z3_ast_vector_to_string = Module['_Z3_ast_vector_to_string'] = createExportWrapper('Z3_ast_vector_to_string', 2);
var _Z3_mk_params = Module['_Z3_mk_params'] = createExportWrapper('Z3_mk_params', 1);
var _Z3_params_inc_ref = Module['_Z3_params_inc_ref'] = createExportWrapper('Z3_params_inc_ref', 2);
var _Z3_params_dec_ref = Module['_Z3_params_dec_ref'] = createExportWrapper('Z3_params_dec_ref', 2);
var _Z3_params_set_bool = Module['_Z3_params_set_bool'] = createExportWrapper('Z3_params_set_bool', 4);
var _Z3_params_set_uint = Module['_Z3_params_set_uint'] = createExportWrapper('Z3_params_set_uint', 4);
var _Z3_params_set_double = Module['_Z3_params_set_double'] = createExportWrapper('Z3_params_set_double', 4);
var _Z3_params_set_symbol = Module['_Z3_params_set_symbol'] = createExportWrapper('Z3_params_set_symbol', 4);
var _Z3_params_to_string = Module['_Z3_params_to_string'] = createExportWrapper('Z3_params_to_string', 2);
var _Z3_params_validate = Module['_Z3_params_validate'] = createExportWrapper('Z3_params_validate', 3);
var _Z3_param_descrs_inc_ref = Module['_Z3_param_descrs_inc_ref'] = createExportWrapper('Z3_param_descrs_inc_ref', 2);
var _Z3_param_descrs_dec_ref = Module['_Z3_param_descrs_dec_ref'] = createExportWrapper('Z3_param_descrs_dec_ref', 2);
var _Z3_param_descrs_get_kind = Module['_Z3_param_descrs_get_kind'] = createExportWrapper('Z3_param_descrs_get_kind', 3);
var _Z3_param_descrs_size = Module['_Z3_param_descrs_size'] = createExportWrapper('Z3_param_descrs_size', 2);
var _Z3_param_descrs_get_name = Module['_Z3_param_descrs_get_name'] = createExportWrapper('Z3_param_descrs_get_name', 3);
var _Z3_param_descrs_get_documentation = Module['_Z3_param_descrs_get_documentation'] = createExportWrapper('Z3_param_descrs_get_documentation', 3);
var _Z3_param_descrs_to_string = Module['_Z3_param_descrs_to_string'] = createExportWrapper('Z3_param_descrs_to_string', 2);
var _fflush = createExportWrapper('fflush', 1);
var _free = Module['_free'] = createExportWrapper('free', 1);
var _malloc = Module['_malloc'] = createExportWrapper('malloc', 1);
var __emscripten_tls_init = createExportWrapper('_emscripten_tls_init', 0);
var __emscripten_thread_init = createExportWrapper('_emscripten_thread_init', 6);
var __emscripten_thread_crashed = createExportWrapper('_emscripten_thread_crashed', 0);
var _emscripten_main_thread_process_queued_calls = createExportWrapper('emscripten_main_thread_process_queued_calls', 0);
var _emscripten_main_runtime_thread_id = createExportWrapper('emscripten_main_runtime_thread_id', 0);
var _emscripten_stack_get_base = () => (_emscripten_stack_get_base = wasmExports['emscripten_stack_get_base'])();
var _emscripten_stack_get_end = () => (_emscripten_stack_get_end = wasmExports['emscripten_stack_get_end'])();
var __emscripten_run_on_main_thread_js = createExportWrapper('_emscripten_run_on_main_thread_js', 5);
var __emscripten_thread_free_data = createExportWrapper('_emscripten_thread_free_data', 1);
var __emscripten_thread_exit = createExportWrapper('_emscripten_thread_exit', 1);
var _strerror = createExportWrapper('strerror', 1);
var __emscripten_check_mailbox = createExportWrapper('_emscripten_check_mailbox', 0);
var _setThrew = createExportWrapper('setThrew', 2);
var __emscripten_tempret_set = createExportWrapper('_emscripten_tempret_set', 1);
var _emscripten_stack_init = () => (_emscripten_stack_init = wasmExports['emscripten_stack_init'])();
var _emscripten_stack_set_limits = (a0, a1) => (_emscripten_stack_set_limits = wasmExports['emscripten_stack_set_limits'])(a0, a1);
var _emscripten_stack_get_free = () => (_emscripten_stack_get_free = wasmExports['emscripten_stack_get_free'])();
var __emscripten_stack_restore = (a0) => (__emscripten_stack_restore = wasmExports['_emscripten_stack_restore'])(a0);
var __emscripten_stack_alloc = (a0) => (__emscripten_stack_alloc = wasmExports['_emscripten_stack_alloc'])(a0);
var _emscripten_stack_get_current = () => (_emscripten_stack_get_current = wasmExports['emscripten_stack_get_current'])();
var ___cxa_decrement_exception_refcount = createExportWrapper('__cxa_decrement_exception_refcount', 1);
var ___cxa_increment_exception_refcount = createExportWrapper('__cxa_increment_exception_refcount', 1);
var ___get_exception_message = createExportWrapper('__get_exception_message', 3);
var ___cxa_can_catch = createExportWrapper('__cxa_can_catch', 3);
var ___cxa_get_exception_ptr = createExportWrapper('__cxa_get_exception_ptr', 1);

function invoke_iii(index,a1,a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viii(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vi(index,a1) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_ii(index,a1) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiii(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vii(index,a1,a2) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_i(index) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)();
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiii(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiii(index,a1,a2,a3,a4,a5) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_v(index) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)();
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiii(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiii(index,a1,a2,a3,a4,a5,a6) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viij(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiij(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiii(index,a1,a2,a3,a4,a5) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viid(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_dii(index,a1,a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiid(index,a1,a2,a3,a4,a5) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiiii(index,a1,a2,a3,a4,a5,a6,a7) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiii(index,a1,a2,a3,a4,a5,a6) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiii(index,a1,a2,a3,a4,a5,a6,a7) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vid(index,a1,a2) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_id(index,a1) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_j(index) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)();
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}

function invoke_iid(index,a1,a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viji(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_jii(index,a1,a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}

function invoke_iiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiid(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiji(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_jiij(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}

function invoke_viiiiiji(index,a1,a2,a3,a4,a5,a6,a7) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iij(index,a1,a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_ji(index,a1) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}

function invoke_diiid(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_diid(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_di(index,a1) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viidi(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiif(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiji(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vij(index,a1,a2) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_fii(index,a1,a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iijii(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_diii(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiid(index,a1,a2,a3,a4,a5) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_jiiii(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}

function invoke_viiiiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiij(index,a1,a2,a3,a4,a5) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3,a4,a5);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_fiii(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiiiiiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vijj(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vifi(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiif(index,a1,a2,a3,a4,a5) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vidi(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viijji(index,a1,a2,a3,a4,a5) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiijj(index,a1,a2,a3,a4,a5,a6,a7) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4,a5,a6,a7);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiid(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (!(e instanceof EmscriptenEH)) throw e;
    _setThrew(1, 0);
  }
}


// include: postamble.js
// === Auto-generated postamble setup entry stuff ===

Module['ccall'] = ccall;
Module['UTF8ToString'] = UTF8ToString;
Module['intArrayFromString'] = intArrayFromString;
Module['FS'] = FS;
Module['PThread'] = PThread;
var missingLibrarySymbols = [
  'writeI53ToI64',
  'writeI53ToI64Clamped',
  'writeI53ToI64Signaling',
  'writeI53ToU64Clamped',
  'writeI53ToU64Signaling',
  'readI53FromI64',
  'readI53FromU64',
  'convertI32PairToI53',
  'convertI32PairToI53Checked',
  'convertU32PairToI53',
  'getTempRet0',
  'growMemory',
  'inetPton4',
  'inetNtop4',
  'inetPton6',
  'inetNtop6',
  'readSockaddr',
  'writeSockaddr',
  'emscriptenLog',
  'jstoi_q',
  'listenOnce',
  'autoResumeAudioContext',
  'getDynCaller',
  'dynCall',
  'runtimeKeepalivePop',
  'asmjsMangle',
  'HandleAllocator',
  'getNativeTypeSize',
  'STACK_SIZE',
  'STACK_ALIGN',
  'POINTER_SIZE',
  'ASSERTIONS',
  'cwrap',
  'uleb128Encode',
  'sigToWasmTypes',
  'generateFuncType',
  'convertJsFunctionToWasm',
  'getEmptyTableSlot',
  'updateTableMap',
  'getFunctionAddress',
  'addFunction',
  'removeFunction',
  'reallyNegative',
  'unSign',
  'strLen',
  'reSign',
  'formatString',
  'intArrayToString',
  'AsciiToString',
  'UTF16ToString',
  'stringToUTF16',
  'lengthBytesUTF16',
  'UTF32ToString',
  'stringToUTF32',
  'lengthBytesUTF32',
  'stringToNewUTF8',
  'registerKeyEventCallback',
  'maybeCStringToJsString',
  'findEventTarget',
  'getBoundingClientRect',
  'fillMouseEventData',
  'registerMouseEventCallback',
  'registerWheelEventCallback',
  'registerUiEventCallback',
  'registerFocusEventCallback',
  'fillDeviceOrientationEventData',
  'registerDeviceOrientationEventCallback',
  'fillDeviceMotionEventData',
  'registerDeviceMotionEventCallback',
  'screenOrientation',
  'fillOrientationChangeEventData',
  'registerOrientationChangeEventCallback',
  'fillFullscreenChangeEventData',
  'registerFullscreenChangeEventCallback',
  'JSEvents_requestFullscreen',
  'JSEvents_resizeCanvasForFullscreen',
  'registerRestoreOldStyle',
  'hideEverythingExceptGivenElement',
  'restoreHiddenElements',
  'setLetterbox',
  'softFullscreenResizeWebGLRenderTarget',
  'doRequestFullscreen',
  'fillPointerlockChangeEventData',
  'registerPointerlockChangeEventCallback',
  'registerPointerlockErrorEventCallback',
  'requestPointerLock',
  'fillVisibilityChangeEventData',
  'registerVisibilityChangeEventCallback',
  'registerTouchEventCallback',
  'fillGamepadEventData',
  'registerGamepadEventCallback',
  'registerBeforeUnloadEventCallback',
  'fillBatteryEventData',
  'battery',
  'registerBatteryEventCallback',
  'setCanvasElementSizeCallingThread',
  'setCanvasElementSizeMainThread',
  'setCanvasElementSize',
  'getCanvasSizeCallingThread',
  'getCanvasSizeMainThread',
  'getCanvasElementSize',
  'jsStackTrace',
  'getCallstack',
  'convertPCtoSourceLocation',
  'checkWasiClock',
  'wasiRightsToMuslOFlags',
  'wasiOFlagsToMuslOFlags',
  'safeSetTimeout',
  'setImmediateWrapped',
  'safeRequestAnimationFrame',
  'clearImmediateWrapped',
  'polyfillSetImmediate',
  'registerPostMainLoop',
  'registerPreMainLoop',
  'getPromise',
  'makePromise',
  'idsToPromises',
  'makePromiseCallback',
  'Browser_asyncPrepareDataCounter',
  'isLeapYear',
  'ydayFromDate',
  'arraySum',
  'addDays',
  'getSocketFromFD',
  'getSocketAddress',
  'FS_unlink',
  'FS_mkdirTree',
  '_setNetworkCallback',
  'heapObjectForWebGLType',
  'toTypedArrayIndex',
  'webgl_enable_ANGLE_instanced_arrays',
  'webgl_enable_OES_vertex_array_object',
  'webgl_enable_WEBGL_draw_buffers',
  'webgl_enable_WEBGL_multi_draw',
  'webgl_enable_EXT_polygon_offset_clamp',
  'webgl_enable_EXT_clip_control',
  'webgl_enable_WEBGL_polygon_mode',
  'emscriptenWebGLGet',
  'computeUnpackAlignedImageSize',
  'colorChannelsInGlTextureFormat',
  'emscriptenWebGLGetTexPixelData',
  'emscriptenWebGLGetUniform',
  'webglGetUniformLocation',
  'webglPrepareUniformLocationsBeforeFirstUse',
  'webglGetLeftBracePos',
  'emscriptenWebGLGetVertexAttrib',
  '__glGetActiveAttribOrUniform',
  'writeGLArray',
  'emscripten_webgl_destroy_context_before_on_calling_thread',
  'registerWebGlEventCallback',
  'runAndAbortIfError',
  'ALLOC_NORMAL',
  'ALLOC_STACK',
  'allocate',
  'writeStringToMemory',
  'writeAsciiToMemory',
  'setErrNo',
  'demangle',
  'stackTrace',
];
missingLibrarySymbols.forEach(missingLibrarySymbol)

var unexportedSymbols = [
  'run',
  'addOnPreRun',
  'addOnInit',
  'addOnPreMain',
  'addOnExit',
  'addOnPostRun',
  'addRunDependency',
  'removeRunDependency',
  'out',
  'err',
  'callMain',
  'abort',
  'wasmMemory',
  'wasmExports',
  'writeStackCookie',
  'checkStackCookie',
  'INT53_MAX',
  'INT53_MIN',
  'bigintToI53Checked',
  'stackSave',
  'stackRestore',
  'stackAlloc',
  'setTempRet0',
  'ptrToString',
  'zeroMemory',
  'exitJS',
  'getHeapMax',
  'abortOnCannotGrowMemory',
  'ENV',
  'ERRNO_CODES',
  'strError',
  'DNS',
  'Protocols',
  'Sockets',
  'timers',
  'warnOnce',
  'readEmAsmArgsArray',
  'readEmAsmArgs',
  'runEmAsmFunction',
  'runMainThreadEmAsm',
  'jstoi_s',
  'getExecutableName',
  'handleException',
  'keepRuntimeAlive',
  'runtimeKeepalivePush',
  'callUserCallback',
  'maybeExit',
  'asyncLoad',
  'alignMemory',
  'mmapAlloc',
  'wasmTable',
  'noExitRuntime',
  'getCFunc',
  'freeTableIndexes',
  'functionsInTableMap',
  'setValue',
  'getValue',
  'PATH',
  'PATH_FS',
  'UTF8Decoder',
  'UTF8ArrayToString',
  'stringToUTF8Array',
  'stringToUTF8',
  'lengthBytesUTF8',
  'stringToAscii',
  'UTF16Decoder',
  'stringToUTF8OnStack',
  'writeArrayToMemory',
  'JSEvents',
  'specialHTMLTargets',
  'findCanvasEventTarget',
  'currentFullscreenStrategy',
  'restoreOldWindowedStyle',
  'UNWIND_CACHE',
  'ExitStatus',
  'getEnvStrings',
  'doReadv',
  'doWritev',
  'initRandomFill',
  'randomFill',
  'promiseMap',
  'uncaughtExceptionCount',
  'exceptionLast',
  'exceptionCaught',
  'ExceptionInfo',
  'findMatchingCatch',
  'getExceptionMessageCommon',
  'incrementExceptionRefcount',
  'decrementExceptionRefcount',
  'getExceptionMessage',
  'Browser',
  'getPreloadedImageData__data',
  'wget',
  'MONTH_DAYS_REGULAR',
  'MONTH_DAYS_LEAP',
  'MONTH_DAYS_REGULAR_CUMULATIVE',
  'MONTH_DAYS_LEAP_CUMULATIVE',
  'SYSCALLS',
  'preloadPlugins',
  'FS_createPreloadedFile',
  'FS_modeStringToFlags',
  'FS_getMode',
  'FS_stdin_getChar_buffer',
  'FS_stdin_getChar',
  'FS_createPath',
  'FS_createDevice',
  'FS_readFile',
  'FS_createDataFile',
  'FS_createLazyFile',
  'MEMFS',
  'TTY',
  'PIPEFS',
  'SOCKFS',
  'tempFixedLengthArray',
  'miniTempWebGLFloatBuffers',
  'miniTempWebGLIntBuffers',
  'GL',
  'AL',
  'GLUT',
  'EGL',
  'GLEW',
  'IDBStore',
  'SDL',
  'SDL_gfx',
  'allocateUTF8',
  'allocateUTF8OnStack',
  'print',
  'printErr',
  'terminateWorker',
  'cleanupThread',
  'registerTLSInit',
  'spawnThread',
  'exitOnMainThread',
  'proxyToMainThread',
  'proxiedJSCallArgs',
  'invokeEntryPoint',
  'checkMailbox',
];
unexportedSymbols.forEach(unexportedRuntimeSymbol);



var calledRun;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
};

function stackCheckInit() {
  // This is normally called automatically during __wasm_call_ctors but need to
  // get these values before even running any of the ctors so we call it redundantly
  // here.
  // See $establishStackSpace for the equivalent code that runs on a thread
  assert(!ENVIRONMENT_IS_PTHREAD);
  _emscripten_stack_init();
  // TODO(sbc): Move writeStackCookie to native to to avoid this.
  writeStackCookie();
}

function run() {

  if (runDependencies > 0) {
    return;
  }

  if (ENVIRONMENT_IS_PTHREAD) {
    // The promise resolve function typically gets called as part of the execution
    // of `doRun` below. The workers/pthreads don't execute `doRun` so the
    // creation promise can be resolved, marking the pthread-Module as initialized.
    readyPromiseResolve(Module);
    initRuntime();
    startWorker(Module);
    return;
  }

  stackCheckInit();

  preRun();

  // a preRun added a dependency, run will be called later
  if (runDependencies > 0) {
    return;
  }

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = true;
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    readyPromiseResolve(Module);
    Module['onRuntimeInitialized']?.();

    assert(!Module['_main'], 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(() => {
      setTimeout(() => Module['setStatus'](''), 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
  checkStackCookie();
}

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var oldOut = out;
  var oldErr = err;
  var has = false;
  out = err = (x) => {
    has = true;
  }
  try { // it doesn't matter if it fails
    _fflush(0);
    // also flush in the JS FS layer
    ['stdout', 'stderr'].forEach((name) => {
      var info = FS.analyzePath('/dev/' + name);
      if (!info) return;
      var stream = info.object;
      var rdev = stream.rdev;
      var tty = TTY.ttys[rdev];
      if (tty?.output?.length) {
        has = true;
      }
    });
  } catch(e) {}
  out = oldOut;
  err = oldErr;
  if (has) {
    warnOnce('stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.');
  }
}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

run();

// end include: postamble.js

// include: postamble_modularize.js
// In MODULARIZE mode we wrap the generated code in a factory function
// and return either the Module itself, or a promise of the module.
//
// We assign to the `moduleRtn` global here and configure closure to see
// this as and extern so it won't get minified.

moduleRtn = readyPromise;

// Assertion for attempting to access module properties on the incoming
// moduleArg.  In the past we used this object as the prototype of the module
// and assigned properties to it, but now we return a distinct object.  This
// keeps the instance private until it is ready (i.e the promise has been
// resolved).
for (const prop of Object.keys(Module)) {
  if (!(prop in moduleArg)) {
    Object.defineProperty(moduleArg, prop, {
      configurable: true,
      get() {
        abort(`Access to module property ('${prop}') is no longer possible via the module constructor argument; Instead, use the result of the module constructor.`)
      }
    });
  }
}
// end include: postamble_modularize.js



  return moduleRtn;
}
);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = initZ3;
else if (typeof define === 'function' && define['amd'])
  define([], () => initZ3);
var isPthread = globalThis.self?.name?.startsWith('em-pthread');
var isNode = typeof globalThis.process?.versions?.node == 'string';
if (isNode) isPthread = require('worker_threads').workerData === 'em-pthread'

// When running as a pthread, construct a new instance on startup
isPthread && initZ3();
