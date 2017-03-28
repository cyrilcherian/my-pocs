var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var babel = require('gulp-babel');
var replace = require('gulp-batch-replace');
var htmlMin = require('gulp-htmlmin');
var gulpSequence = require('gulp-sequence');

var scripts = ['app/js/app.module.js', 'app/js/app.config.js',
    'app/js/core/core.module.js', 'app/js/core/notifier/notifier.module.js', 'app/js/core/notifier/notifier.service.js',
    'app/js/core/comment/comment.module.js', 'app/js/core/comment/comment.service.js',
    'app/js/core/configuration/configuration.module.js', 'app/js/core/configuration/configuration.service.js',
    'app/js/core/constants/constants.module.js', 'app/js/core/constants/constants.js',
    'app/js/core/review/review.module.js', 'app/js/core/review/review.service.js',
    'app/js/core/assignment-orchestrator/assignment-orchestrator.module.js', 'app/js/core/assignment-orchestrator/assignment-orchestrator.service.js',
    'app/js/core/question/question.module.js', 'app/js/core/question/question.service.js',
    'app/js/core/util/util.module.js', 'app/js/core/util/util.service.js',
    'app/js/core/report/report.module.js', 'app/js/core/report/report.service.js',
    'app/js/core/bank/bank.module.js', 'app/js/core/bank/bank.service.js',
    'app/js/core/logging/logging.module.js', 'app/js/core/logging/logging.service.js',
    'app/js/qb-question-table-inprogress/qb-question-table-inprogress.module.js', 'app/js/qb-question-table-inprogress/qb-question-table-inprogress.component.js',
    'app/js/qb-question-table-inpublished/qb-question-table-inpublished.module.js', 'app/js/qb-question-table-inpublished/qb-question-table-inpublished.component.js',
    'app/js/qb-question-table-inretired/qb-question-table-inretired.module.js', 'app/js/qb-question-table-inretired/qb-question-table-inretired.component.js',
    'app/js/qb-question/qb-question.module.js', 'app/js/qb-question/qb-question.component.js',
    'app/js/qb-question-tab/qb-question-tab.module.js', 'app/js/qb-question-tab/qb-question-tab.component.js',
    'app/js/qb-user-directory/qb-user-directory.module.js', 'app/js/qb-user-directory/qb-user-directory.component.js',
    'app/js/qb-user-active-table/qb-user-active-table.module.js', 'app/js/qb-user-active-table/qb-user-active-table.component.js',
    'app/js/qb-user-inactive-table/qb-user-inactive-table.module.js', 'app/js/qb-user-inactive-table/qb-user-inactive-table.component.js',
    'app/js/qb-user-directory-menu/qb-user-directory-menu.module.js', 'app/js/qb-user-directory-menu/qb-user-directory-menu.component.js',
    'app/js/qb-user-profile/qb-user-profile.module.js', 'app/js/qb-user-profile/qb-user-profile.component.js',
    'app/js/qb-user-profile-details/qb-user-profile-details.module.js', 'app/js/qb-user-profile-details/qb-user-profile-details.component.js',
    'app/js/qb-question-import/qb-question-import.module.js', 'app/js/qb-question-import/qb-question-import.component.js',
    'app/js/qb-question-create/qb-question-create.module.js', 'app/js/qb-question-create/qb-question-create.component.js',
    'app/js/qb-question-details/qb-question-details.module.js', 'app/js/qb-question-details/qb-question-details.component.js',
    'app/js/qb-question-tag/qb-question-tag.module.js', 'app/js/qb-question-tag/qb-question-tag.component.js',
    'app/js/qb-question-references/qb-question-references.module.js', 'app/js/qb-question-references/qb-question-references.component.js',
    'app/js/qb-question-review-view/qb-question-review-view.module.js', 'app/js/qb-question-review-view/qb-question-review-view.component.js',
    'app/js/qb-question-revision/qb-question-revision.module.js', 'app/js/qb-question-revision/qb-question-revision.component.js',
    'app/js/qb-question-revision-dialog/qb-question-revision-dialog.module.js', 'app/js/qb-question-revision-dialog/qb-question-revision-dialog.component.js',
    'app/js/qb-question-revision-view-dialog/qb-question-revision-view-dialog.module.js', 'app/js/qb-question-revision-view-dialog/qb-question-revision-view-dialog.component.js',
    'app/js/qb-question-edit/qb-question-edit.module.js', 'app/js/qb-question-edit/qb-question-edit.component.js',
    'app/js/qb-question-edit-dialog/qb-question-edit-dialog.module.js', 'app/js/qb-question-edit-dialog/qb-question-edit-dialog.component.js',
    'app/js/qb-question-add-image/qb-question-add-image.module.js', 'app/js/qb-question-add-image/qb-question-add-image.component.js',
    'app/js/qb-question-add-video/qb-question-add-video.module.js', 'app/js/qb-question-add-video/qb-question-add-video.component.js',
    'app/js/qb-question-add-multiplechoice/qb-question-add-multiplechoice.module.js', 'app/js/qb-question-add-multiplechoice/qb-question-add-multiplechoice.component.js',
    'app/js/qb-question-display-text/qb-question-display-text.module.js', 'app/js/qb-question-display-text/qb-question-display-text.component.js',
    'app/js/qb-question-display-image/qb-question-display-image.module.js', 'app/js/qb-question-display-image/qb-question-display-image.component.js',
    'app/js/qb-question-information/qb-question-information.module.js', 'app/js/qb-question-information/qb-question-information.component.js',
    'app/js/qb-criteria/qb-criteria.module.js', 'app/js/qb-criteria/qb-criteria.component.js',
    'app/js/qb-banks/qb-banks.module.js', 'app/js/qb-banks/qb-banks.component.js',
    'app/js/qb-question-history/qb-question-history.module.js', 'app/js/qb-question-history/qb-question-history.component.js',
    'app/js/qb-question-history-dialog/qb-question-history-dialog.module.js', 'app/js/qb-question-history-dialog/qb-question-history-dialog.component.js',
    'app/js/qb-question-add-multipleresponse/qb-question-add-multipleresponse.module.js', 'app/js/qb-question-add-multipleresponse/qb-question-add-multipleresponse.component.js',
    'app/js/qb-question-add-shortanswer/qb-question-add-shortanswer.module.js', 'app/js/qb-question-add-shortanswer/qb-question-add-shortanswer.component.js',
    'app/js/qb-question-add-essay/qb-question-add-essay.module.js', 'app/js/qb-question-add-essay/qb-question-add-essay.component.js',
    'app/js/qb-assignees/qb-assignees.module.js', 'app/js/qb-assignees/qb-assignees.component.js',
    'app/js/qb-question-answerkey/qb-question-answerkey.module.js', 'app/js/qb-question-answerkey/qb-question-answerkey.component.js',
    'app/js/qb-question-add-rationale/qb-question-add-rationale.module.js', 'app/js/qb-question-add-rationale/qb-question-add-rationale.component.js',
    'app/js/qb-topic-list/qb-topic-list.module.js', 'app/js/qb-topic-list/qb-topic-list.component.js',
    'app/js/qb-level-list/qb-level-list.module.js', 'app/js/qb-level-list/qb-level-list.component.js',
    'app/js/qb-login/qb-login.module.js', 'app/js/qb-login/qb-login.component.js',
    'app/js/qb-bank-info/qb-bank-info.module.js', 'app/js/qb-bank-info/qb-bank-info.component.js',
    'app/js/core/user/user.module.js', 'app/js/core/user/user.service.js',
    'app/js/core/media/media.module.js', 'app/js/core/media/media.service.js',
    'app/js/core/state/state.module.js', 'app/js/core/state/state.service.js',
    'app/js/qb-criteria-add/qb-criteria-add.module.js', 'app/js/qb-criteria-add/qb-criteria-add.component.js',
    'app/js/qb-question-list/qb-question-list.module.js', 'app/js/qb-question-list/qb-question-list.component.js',
    'app/js/qb-assignment-review/qb-assignment-review.module.js', 'app/js/qb-assignment-review/qb-assignment-review.component.js',
    'app/js/core/role/role.module.js', 'app/js/core/role/role.service.js',
    'app/js/core/tag/tag.module.js', 'app/js/core/tag/tag.service.js',
    'app/js/qb-logout/qb-logout.module.js', 'app/js/qb-logout/qb-logout.component.js',
    'app/js/qb-users-select/qb-users-select.module.js', 'app/js/qb-users-select/qb-users-select.component.js',
    'app/js/qb-assignments/qb-assignments.module.js', 'app/js/qb-assignments/qb-assignments.component.js',
    'app/js/qb-assignments-to-do/qb-assignments-to-do.module.js', 'app/js/qb-assignments-to-do/qb-assignments-to-do.component.js',
    'app/js/qb-assignments-assigned-by-me/qb-assignments-assigned-by-me.module.js', 'app/js/qb-assignments-assigned-by-me/qb-assignments-assigned-by-me.component.js',
    'app/js/qb-assignments-submitted/qb-assignments-submitted.module.js', 'app/js/qb-assignments-submitted/qb-assignments-submitted.component.js',
    'app/js/qb-assignments-done/qb-assignments-done.module.js', 'app/js/qb-assignments-done/qb-assignments-done.component.js',
    'app/js/qb-assignments-assigned-by-others/qb-assignments-assigned-by-others.module.js', 'app/js/qb-assignments-assigned-by-others/qb-assignments-assigned-by-others.component.js',
    'app/js/qb-assignment-details/qb-assignment-details.module.js', 'app/js/qb-assignment-details/qb-assignment-details.component.js',
    'app/js/qb-assignment-details-tab/qb-assignment-details-tab.module.js', 'app/js/qb-assignment-details-tab/qb-assignment-details-tab.component.js',
    'app/js/qb-reset-password/qb-reset-password.module.js', 'app/js/qb-reset-password/qb-reset-password.component.js',
    'app/js/qb-forgot-password/qb-forgot-password.module.js', 'app/js/qb-forgot-password/qb-forgot-password.component.js',
    'app/js/qb-assignment-mine/qb-assignment-mine.module.js', 'app/js/qb-assignment-mine/qb-assignment-mine.component.js',
    'app/js/qb-dialog-question/qb-dialog-question.module.js', 'app/js/qb-dialog-question/qb-dialog-question.component.js',
    'app/js/qb-assignment-turn-in/qb-assignment-turn-in.module.js', 'app/js/qb-assignment-turn-in/qb-assignment-turn-in.component.js',
    'app/js/qb-assignment-history/qb-assignment-history.module.js', 'app/js/qb-assignment-history/qb-assignment-history.component.js',
    'app/js/qb-assignment-submissions/qb-assignment-submissions.module.js', 'app/js/qb-assignment-submissions/qb-assignment-submissions.component.js',
    'app/js/qb-assignment-return-assignment/qb-assignment-return-assignment.module.js', 'app/js/qb-assignment-return-assignment/qb-assignment-return-assignment.component.js',
    'app/js/qb-sidenav/qb-sidenav.module.js', 'app/js/qb-sidenav/qb-sidenav.component.js',
    'app/js/qb-assignment-reviewmine/qb-assignment-reviewmine.module.js', 'app/js/qb-assignment-reviewmine/qb-assignment-reviewmine.component.js',
    'app/js/qb-table-search-bar/qb-table-search-bar.module.js', 'app/js/qb-table-search-bar/qb-table-search-bar.component.js',
    'app/js/core/version/version.module.js', 'app/js/core/version/version.service.js',
    'app/js/qb-user-profile-create/qb-user-profile-create.module.js', 'app/js/qb-user-profile-create/qb-user-profile-create.component.js',
    'app/js/qb-sidenav-button/qb-sidenav-button.module.js', 'app/js/qb-sidenav-button/qb-sidenav-button.component.js',
    'app/js/qb-question-preview/qb-question-preview.module.js', 'app/js/qb-question-preview/qb-question-preview.component.js',
    'app/js/qb-question-preview-dialog/qb-question-preview-dialog.module.js', 'app/js/qb-question-preview-dialog/qb-question-preview-dialog.component.js',
    'app/js/qb-question-more/qb-question-more.module.js', 'app/js/qb-question-more/qb-question-more.component.js',
    'app/js/qb-question-image-dialog/qb-question-image-dialog.module.js', 'app/js/qb-question-image-dialog/qb-question-image-dialog.component.js',
    'app/js/qb-add-comment/qb-add-comment.module.js', 'app/js/qb-add-comment/qb-add-comment.component.js',
    'app/js/qb-display-comments/qb-display-comments.module.js', 'app/js/qb-display-comments/qb-display-comments.component.js',
    'app/js/qb-assignment-complete-confirm/qb-assignment-complete-confirm.module.js', 'app/js/qb-assignment-complete-confirm/qb-assignment-complete-confirm.component.js',
    'app/js/qb-assignment-more/qb-assignment-more.module.js', 'app/js/qb-assignment-more/qb-assignment-more.component.js',
    'app/js/qb-bank-create/qb-bank-create.module.js', 'app/js/qb-bank-create/qb-bank-create.component.js',
    'app/js/qb-bank-edit/qb-bank-edit.module.js', 'app/js/qb-bank-edit/qb-bank-edit.component.js',
    'app/js/qb-bank-export/qb-bank-export.module.js', 'app/js/qb-bank-export/qb-bank-export.component.js',
    'app/js/qb-question-display-video/qb-question-display-video.module.js', 'app/js/qb-question-display-video/qb-question-display-video.component.js',
    'app/js/qb-change-password/qb-change-password.module.js', 'app/js/qb-change-password/qb-change-password.component.js',
    'app/js/qb-bank-dialog-question/qb-bank-dialog-question.module.js', 'app/js/qb-bank-dialog-question/qb-bank-dialog-question.component.js',
    'app/js/qb-question-checkbox-list/qb-question-checkbox-list.module.js', 'app/js/qb-question-checkbox-list/qb-question-checkbox-list.component.js',
    'app/js/core/filter/filter.module.js', 'app/js/core/filter/filter.js',
    'app/js/qb-add-pdf/qb-add-pdf.module.js', 'app/js/qb-add-pdf/qb-add-pdf.component.js',
    'app/js/core/notification/notification.module.js', 'app/js/core/notification/notification.service.js',
    'app/js/qb-notification-bar/qb-notification-bar.module.js', 'app/js/qb-notification-bar/qb-notification-bar.component.js',
    'app/js/qb-user-guide/qb-user-guide.module.js', 'app/js/qb-user-guide/qb-user-guide.component.js',
    'app/js/qb-user-guide-carousel/qb-user-guide-carousel.module.js', 'app/js/qb-user-guide-carousel/qb-user-guide-carousel.component.js',
    'app/js/qb-validation-dialog/qb-validation-dialog.module.js', 'app/js/qb-validation-dialog/qb-validation-dialog.component.js',
    'app/js/qb-assignment-create/qb-assignment-create.module.js', 'app/js/qb-assignment-create/qb-assignment-create.component.js',
    'app/js/qb-assignment-create-form/qb-assignment-create-form.module.js', 'app/js/qb-assignment-create-form/qb-assignment-create-form.component.js',
    'app/js/qb-add-review-comment/qb-add-review-comment.module.js', 'app/js/qb-add-review-comment/qb-add-review-comment.component.js',
    'app/js/qb-question-review-dialog/qb-question-review-dialog.module.js', 'app/js/qb-question-review-dialog/qb-question-review-dialog.component.js',
    'app/js/qb-view-submission-reviews/qb-view-submission-reviews.module.js', 'app/js/qb-view-submission-reviews/qb-view-submission-reviews.component.js',
    'app/js/qb-question-review-comments-switchlist/qb-question-review-comments-switchlist.module.js', 'app/js/qb-question-review-comments-switchlist/qb-question-review-comments-switchlist.component.js',
    'app/js/qb-assignment-history-dialog/qb-assignment-history-dialog.module.js', 'app/js/qb-assignment-history-dialog/qb-assignment-history-dialog.component.js',
    'app/js/qb-assignment-details-dialog/qb-assignment-details-dialog.module.js', 'app/js/qb-assignment-details-dialog/qb-assignment-details-dialog.component.js',
    'app/js/qb-question-create-dialog/qb-question-create-dialog.module.js', 'app/js/qb-question-create-dialog/qb-question-create-dialog.component.js',
    'app/js/qb-question-create-header/qb-question-create-header.module.js', 'app/js/qb-question-create-header/qb-question-create-header.component.js',
    'app/js/qb-question-create-form/qb-question-create-form.module.js', 'app/js/qb-question-create-form/qb-question-create-form.component.js',
    'app/js/qb-reports/qb-reports.module.js', 'app/js/qb-reports/qb-reports.component.js',
    'app/js/qb-assignment-create-header/qb-assignment-create-header.module.js', 'app/js/qb-assignment-create-header/qb-assignment-create-header.component.js',
    'app/js/qb-assignment-create-dialog/qb-assignment-create-dialog.module.js', 'app/js/qb-assignment-create-dialog/qb-assignment-create-dialog.component.js',
    'app/js/qb-question-filter-dialog/qb-question-filter-dialog.module.js', 'app/js/qb-question-filter-dialog/qb-question-filter-dialog.component.js',    
    'app/js/qb-assignment-filter-dialog/qb-assignment-filter-dialog.module.js', 'app/js/qb-assignment-filter-dialog/qb-assignment-filter-dialog.component.js',
    'app/js/qb-assignment-confirm-created-dialog/qb-assignment-confirm-created-dialog.module.js', 'app/js/qb-assignment-confirm-created-dialog/qb-assignment-confirm-created-dialog.component.js',
    'app/js/qb-question-action-verification-dialog/qb-question-action-verification-dialog.module.js', 'app/js/qb-question-action-verification-dialog/qb-question-action-verification-dialog.component.js',
    'app/js/qb-question-add-to-question-bank-dialog/qb-question-add-to-question-bank-dialog.module.js', 'app/js/qb-question-add-to-question-bank-dialog/qb-question-add-to-question-bank-dialog.component.js',
    'app/js/qb-bank-create-dialog/qb-bank-create-dialog.module.js', 'app/js/qb-bank-create-dialog/qb-bank-create-dialog.component.js',
    'app/js/qb-bank-create-form/qb-bank-create-form.module.js', 'app/js/qb-bank-create-form/qb-bank-create-form.component.js',
    'app/js/qb-bank-create-header/qb-bank-create-header.module.js', 'app/js/qb-bank-create-header/qb-bank-create-header.component.js',
    'app/js/qb-banks-screen/qb-banks-screen.module.js', 'app/js/qb-banks-screen/qb-banks-screen.component.js',
    'app/js/qb-banks-dialog/qb-banks-dialog.module.js', 'app/js/qb-banks-dialog/qb-banks-dialog.component.js',
    'app/js/qb-bank-edit-dialog/qb-bank-edit-dialog.module.js', 'app/js/qb-bank-edit-dialog/qb-bank-edit-dialog.component.js',
    'app/js/qb-questionbank-filter-dialog/qb-questionbank-filter-dialog.module.js', 'app/js/qb-questionbank-filter-dialog/qb-questionbank-filter-dialog.component.js',
    'app/js/qb-question-table-filter/qb-question-table-filter.module.js', 'app/js/qb-question-table-filter/qb-question-table-filter.component.js',
    'app/js/qb-assignments-filter-results/qb-assignments-filter-results.module.js', 'app/js/qb-assignments-filter-results/qb-assignments-filter-results.component.js',
    'app/js/qb-question-manage-questions/qb-question-manage-questions.module.js', 'app/js/qb-question-manage-questions/qb-question-manage-questions.component.js'
];
var localScripts = scripts.concat(['app/js/core/constants/local-constants.js']);
var devScripts = scripts.concat(['app/js/core/constants/dev-constants.js']);
var prodScripts = scripts.concat(['app/js/core/constants/prod-constants.js']);
var mobomoScripts = scripts.concat(['app/js/core/constants/mobomo-constants.js']);

gulp.task('clean', function() {
    return gulp.src(['app/minified/prod-scripts.min.js', 'app.min.css', 'app.css'], {
        read: false
    })
        .pipe(clean({
            force: true
        }));
});

gulp.task('styles-dev', function() {
    gulp.src('app/sass/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./'));
});

gulp.task('styles-prod', function() {
    gulp.src('app/sass/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('./'));
});

gulp.task('concat-dev-scripts', function() {
    return gulp.src(devScripts)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('all-dev.js'))
        .pipe(gulp.dest('./app/minified'));
});

gulp.task('concat-local-scripts', function() {
    return gulp.src(localScripts)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('all-local.js'))
        .pipe(gulp.dest('./app/minified'));
});

gulp.task('concat-mobomo-scripts', function() {
    return gulp.src(mobomoScripts)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('all-mobomo.js'))
        .pipe(gulp.dest('./app/minified'));
});

gulp.task('concat-prod-scripts', function() {
    return gulp.src(prodScripts)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('all-prod.js'))
        .pipe(gulp.dest('./app/minified'));
});

gulp.task('minify-prod-scripts', function() {
    return gulp.src('app/minified/all-prod.js',{base: "./" })
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('.'));
});

gulp.task('asco-dev-basic', ['clean', 'concat-dev-scripts', 'styles-dev', 'asco'], function() {
    var target = gulp.src('index.html');
    var sources = gulp.src(['app/minified/all-dev.js'], {
        read: false
    }, {
        relative: true
    });
    return target.pipe(inject(sources, {
        addRootSlash: false,
        addPrefix: '.'
    }))
        .pipe(inject(gulp.src(['app.css'], {
            read: false
        }, {
            relative: true
        }), {
            addRootSlash: false
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('asco-prod-replace', function (){
  var json = require('./app/js/core/constants/asco.json');
  return gulp.src('app/minified/all-prod.js',{base: "./" })
      .pipe(replace(json.replacements))
      .pipe(gulp.dest('.'));
});

gulp.task('apa-prod-replace', function (){
  var json = require('./app/js/core/constants/apa.json');
  return gulp.src('app/minified/all-prod.js',{base: "./" })
      .pipe(replace(json.replacements))
      .pipe(gulp.dest('.'));
});

gulp.task('apa-dev-basic', ['clean', 'concat-dev-scripts', 'styles-dev', 'apa'], function() {
    var target = gulp.src('index.html');
    var sources = gulp.src(['app/minified/all-dev.js'], {
        read: false
    }, {
        relative: true
    });
    return target.pipe(inject(sources, {
        addRootSlash: false,
        addPrefix: '.'
    }))
        .pipe(inject(gulp.src(['app.css'], {
            read: false
        }, {
            relative: true
        }), {
            addRootSlash: false
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('asco-local-basic', ['clean', 'concat-local-scripts', 'styles-dev', 'asco'], function() {
    var target = gulp.src('index.html');
    var sources = gulp.src(['app/minified/all-local.js'], {
        read: false
    }, {
        relative: true
    });
    return target.pipe(inject(sources, {
        addRootSlash: false,
        addPrefix: '.'
    }))
        .pipe(inject(gulp.src(['app.css'], {
            read: false
        }, {
            relative: true
        }), {
            addRootSlash: false
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('apa-local-basic', ['clean', 'concat-local-scripts', 'styles-dev', 'apa'], function() {
    var target = gulp.src('index.html');
    var sources = gulp.src(['app/minified/all-local.js'], {
        read: false
    }, {
        relative: true
    });
    return target.pipe(inject(sources, {
        addRootSlash: false,
        addPrefix: '.'
    }))
        .pipe(inject(gulp.src(['app.css'], {
            read: false
        }, {
            relative: true
        }), {
            addRootSlash: false
        }))
        .pipe(gulp.dest('.'));
});


gulp.task('asco-mobomo-basic', ['concat-mobomo-scripts', 'styles-dev', 'asco'], function() {
    var target = gulp.src('index.html');
    var sources = gulp.src(['app/minified/all-mobomo.js'], {
        read: false
    }, {
        relative: true
    });
    return target.pipe(inject(sources, {
        addRootSlash: false,
        addPrefix: '.'
    }))
        .pipe(inject(gulp.src(['app.css'], {
            read: false
        }, {
            relative: true
        }), {
            addRootSlash: false
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('apa-mobomo-basic', ['concat-mobomo-scripts', 'styles-dev', 'apa'], function() {
    var target = gulp.src('index.html');
    var sources = gulp.src(['app/minified/all-mobomo.js'], {
        read: false
    }, {
        relative: true
    });
    return target.pipe(inject(sources, {
        addRootSlash: false,
        addPrefix: '.'
    }))
        .pipe(inject(gulp.src(['app.css'], {
            read: false
        }, {
            relative: true
        }), {
            addRootSlash: false
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('asco-prod-basic', gulpSequence(['clean', 'asco'], ['concat-prod-scripts', 'styles-prod'], 'asco-prod-replace', 'minify-prod-scripts' ));

gulp.task('apa-prod-basic', gulpSequence(['clean', 'apa'], ['concat-prod-scripts', 'styles-prod'], 'apa-prod-replace', 'minify-prod-scripts' ));

gulp.task('asco-local-be', ['asco-local'], function() {
    gulp.watch(['app/js/**/*.js', 'app/sass/**/*.scss', 'app/js/**/*.html'], ['asco-local']);
});
gulp.task('apa-local-be', ['apa-local'], function() {
    gulp.watch(['app/js/**/*.js', 'app/sass/**/*.scss', 'app/js/**/*.html'], ['apa-local']);
});
gulp.task('asco-remote-be', ['asco-mobomo'], function() {
    gulp.watch(['app/js/**/*.js', 'app/sass/**/*.scss', 'app/js/**/*.html'], ['asco-mobomo']);
});
gulp.task('apa-remote-be', ['apa-mobomo'], function() {
    gulp.watch(['app/js/**/*.js', 'app/sass/**/*.scss', 'app/js/**/*.html'], ['apa-mobomo']);
});
gulp.task('asco-qc-be', ['asco-dev'], function() {
    gulp.watch(['app/js/**/*.js', 'app/sass/**/*.scss', 'app/js/**/*.html'], ['asco-dev']);
});
gulp.task('apa-qc-be', ['apa-dev'], function() {
    gulp.watch(['app/js/**/*.js', 'app/sass/**/*.scss', 'app/js/**/*.html'], ['apa-dev']);
});

gulp.task('asco', function() {
    var json = require('./app/js/core/constants/asco.json');
    return gulp.src('app/js/**/*.html')
        .pipe(replace(json.replacements))
        .pipe(htmlMin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('app/minified'));
});

gulp.task('apa', function() {
    var json = require('./app/js/core/constants/apa.json');
    return gulp.src('app/js/**/*.html')
        .pipe(replace(json.replacements))
        .pipe(htmlMin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('app/minified'));
});

gulp.task('asco-local',['asco-local-basic'], function() {
    var json = require('./app/js/core/constants/asco.json');
    return gulp.src('app/minified/all-local.js',{base: "./" })
        .pipe(replace(json.replacements))
        .pipe(gulp.dest('.'));
});

gulp.task('apa-local',['apa-local-basic'], function() {
    var json = require('./app/js/core/constants/apa.json');
    return gulp.src('app/minified/all-local.js',{base: "./" })
        .pipe(replace(json.replacements))
        .pipe(gulp.dest('.'));
});

gulp.task('asco-mobomo',['asco-mobomo-basic'], function() {
    var json = require('./app/js/core/constants/asco.json');
    return gulp.src('app/minified/all-mobomo.js',{base: "./" })
        .pipe(replace(json.replacements))
        .pipe(gulp.dest('.'));
});

gulp.task('apa-mobomo',['apa-mobomo-basic'], function() {
    var json = require('./app/js/core/constants/apa.json');
    return gulp.src('app/minified/all-mobomo.js',{base: "./" })
        .pipe(replace(json.replacements))
        .pipe(gulp.dest('.'));
});

gulp.task('asco-dev',['asco-dev-basic'], function() {
    var json = require('./app/js/core/constants/asco.json');
    return gulp.src('app/minified/all-dev.js',{base: "./" })
        .pipe(replace(json.replacements))
        .pipe(gulp.dest('.'));
});

gulp.task('apa-dev',['apa-dev-basic'], function() {
    var json = require('./app/js/core/constants/apa.json');
    return gulp.src('app/minified/all-dev.js',{base: "./" })
        .pipe(replace(json.replacements))
        .pipe(gulp.dest('.'));
});

gulp.task('asco-prod', ['asco-prod-basic'], function() {
    var target = gulp.src('index.html');
    var sources = gulp.src(['app/minified/all-prod.js'], {
        read: false
    }, {
        relative: true
    });
    return target.pipe(inject(sources, {
        addRootSlash: false,
        addPrefix: '.'
    }))
        .pipe(inject(gulp.src(['app.min.css'], {
            read: false
        }, {
            relative: true
        }), {
            addRootSlash: false
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('apa-prod', ['apa-prod-basic'], function() {
    var target = gulp.src('index.html');
    var sources = gulp.src(['app/minified/all-prod.js'], {
        read: false
    }, {
        relative: true
    });
    return target.pipe(inject(sources, {
        addRootSlash: false,
        addPrefix: '.'
    }))
        .pipe(inject(gulp.src(['app.min.css'], {
            read: false
        }, {
            relative: true
        }), {
            addRootSlash: false
        }))
        .pipe(gulp.dest('.'));
});
